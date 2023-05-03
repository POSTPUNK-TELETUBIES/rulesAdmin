import { SupabaseClient, createClient } from "@supabase/supabase-js";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { supabaseURL, supbaseToken } from "../config/supabase";
import {
  Database,
  LanguageDTO,
  QualityProfileDTO,
  RulesResponse,
} from "../../types/supabase";
import {
  FetchClientSingleton,
  PaginationParams,
  Pojo,
  RulesFilter,
} from "../../types/fetchClient";
import { LocalRulesStatus } from "./dexie";

export class LocalSupabaseClient implements FetchClientSingleton {
  private static instance: LocalSupabaseClient;
  private static readonly whiteList = {
    ts: true,
    js: true,
    css: true,
    java: true,
    web: true,
  };

  private constructor(private client: SupabaseClient<Database>) {}

  private async getCSVReportUpdatables(qualityProfileId: number) {
    return await this.client
      .rpc("get_changed_q", { quality_id: Number(qualityProfileId) })
      .select("*")
      .csv()
      .throwOnError();
  }

  private async getCSVCompletFiltered(filter: RulesFilter) {
    return await this.prepareFilteredQuery(filter).csv().throwOnError();
  }

  //TODO: evaluar pasar a un servio aparte
  async downloadReport(filter: RulesFilter, toUpdate = true) {
    const { data } = toUpdate
      ? await this.getCSVReportUpdatables(Number(filter.qualityProfile_id))
      : await this.getCSVCompletFiltered(filter);

    // TODO: create an element and get wiht querySelector
    // TODO: or investigate how to pipe with rxjs
    const downloader = document.createElement("a");
    downloader.download = "report";
    const url = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    downloader.href = url;

    downloader.click();
    URL.revokeObjectURL(url);
    downloader.remove();
  }

  private changeIsActive(data: LocalRulesStatus[], newStatus = true) {
    if (data.length)
      return this.client
        .from("status")
        .update({
          isActive: newStatus,
          updated_at: new Date(),
        })
        .in(
          "id",
          data.map(({ id }) => id)
        )
        .throwOnError();
  }

  async postNewStatus(updateInfo: LocalRulesStatus[]) {
    const toFalse = updateInfo.filter(({ newStatus }) => !newStatus);
    const toTrue = updateInfo.filter(({ newStatus }) => newStatus);

    await Promise.all([
      this.changeIsActive(toFalse, false),
      this.changeIsActive(toTrue, true),
    ]);
  }

  async getTotalCountByTable(tableName: string): Promise<number> {
    const { count } = await this.client
      .from(tableName)
      .select("*", { count: "exact", head: true })
      .throwOnError();

    return count ?? 0;
  }

  async getQualityProfilesByLanguage(
    languageId: string
  ): Promise<QualityProfileDTO[] | null> {
    const { data } = await this.client
      .from("qualityprofiles")
      .select()
      .eq("language_id", languageId)
      .throwOnError();

    return data as QualityProfileDTO[];
  }

  private static queryBuilderColumns = {
    severity: "rules.severity",
    type: "rules.type",
    isActiveSonar: "isActiveSonar",
    qualityProfile_id: "qualityProfile_id",
  };

  private buildQuery(
    query: PostgrestFilterBuilder<any, any, Pojo[]>,
    filter: Partial<RulesFilter>
  ) {
    for (const key in filter) {
      if (!Object.prototype.hasOwnProperty.call(filter, key)) continue;

      const element = filter[key];

      if (element !== "all" && element != null)
        query = query.eq(LocalSupabaseClient.queryBuilderColumns[key], element);
    }

    return query;
  }

  private prepareFilteredQuery(filter: RulesFilter) {
    delete filter.lang_id;

    const query = this.client.from("status").select(
      `
        *,
        qualityprofiles(
          *
        ),
        rules!inner(
          *
        )
      `,
      { count: "exact" }
    );

    return this.buildQuery(query, filter);
  }

  async getPaginatedRulesByFilter(
    filter: RulesFilter,
    pagination: PaginationParams
  ) {
    const query = this.prepareFilteredQuery(filter);

    const { data, count } = await query
      .range(...this.getRange(pagination))
      .order("id", { ascending: true })
      .throwOnError();

    return { data: data as RulesResponse[], count };
  }

  async getAllLanguages(): Promise<LanguageDTO[] | null> {
    const { data } = await this.client
      .from("languages")
      .select()
      .throwOnError();

    return (<LanguageDTO[]>data).filter(
      ({ name }) => LocalSupabaseClient.whiteList[name]
    );
  }

  static getInstance() {
    LocalSupabaseClient.instance ??= new LocalSupabaseClient(
      createClient<Database>(supabaseURL, supbaseToken)
    );

    return LocalSupabaseClient.instance;
  }

  private getRange({ page, limit = 10 }: PaginationParams): [number, number] {
    return [(page - 1) * limit, page * limit - 1];
  }

  // TODO: Should be using text search and not like
  // TODO: There are no tests, this methods should be tested
  async getByRuleName(
    rule: string,
    filter: RulesFilter,
    pagination: PaginationParams
  ) {
    const { data, count } = await this.prepareFilteredQuery(filter)
      .ilike("rules.name", `%${rule}%`)
      // TODO: code duplicated, search for an abstraction
      .range(...this.getRange(pagination))
      .order("id", { ascending: true })
      .throwOnError();

    return {
      data: data as RulesResponse[],
      count,
    };
  }
}

export default LocalSupabaseClient.getInstance;
