import {
  RealtimePostgresUpdatePayload,
  SupabaseClient,
  createClient,
} from '@supabase/supabase-js';

import type { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { supabaseURL, supbaseToken } from '../config/supabase';

import {
  Database,
  LanguageDTO,
  QualityProfileDTO,
  RulesResponse,
  RulesStatus,
} from '../../types/supabase';

import {
  FetchClientSingleton,
  PaginationParams,
  Pojo,
  RulesFilter,
} from '../../types/fetchClient';

import { LocalRulesStatus } from './dexie';
import { getTodayMidnight, isNill, keyBy } from '../../tools';
import { GenericSchema } from '@supabase/supabase-js/dist/module/lib/types';

import ReportGenerator from './reportGenerator';
import type { IReportGenerator } from '../../types/reports';

export class LocalSupabaseClient implements FetchClientSingleton {
  static getInstance(client?: SupabaseClient) {
    LocalSupabaseClient.instance ??= new LocalSupabaseClient(
      client ?? createClient<Database>(supabaseURL, supbaseToken)
    );

    return LocalSupabaseClient.instance;
  }

  private static instance: LocalSupabaseClient;
  private static readonly whiteList = {
    ts: true,
    js: true,
    css: true,
    java: true,
    web: true,
  };

  private constructor(
    private client: SupabaseClient<Database>,
    private reportGenerator: IReportGenerator = ReportGenerator
  ) {}

  public async getConflicts(dataToUpdate: LocalRulesStatus[]) {
    const today = getTodayMidnight().toISOString();

    const query = this.client
      .from('status')
      .select(
        `
        *,
        qualityprofiles(
        *
        ),
        rules!inner(
          *
      )
      `
      )
      .in(
        'id',
        dataToUpdate.map(({ id }) => id)
      )
      .gt('updated_at', today)
      .throwOnError();

    const { data } = await query;

    const dataBy = keyBy<RulesResponse>(<RulesResponse[]>data, 'id');

    const filterToUpdateWithConflict = dataToUpdate.filter(
      ({ id, newStatus }) =>
        isNill(dataBy[id]?.isActive) && dataBy[id]?.isActive !== newStatus
    );

    return filterToUpdateWithConflict.map((filtered) => {
      const { rules, ...rest } = dataBy[filtered.id];
      return {
        ...rules,
        ...rest,
        ...filtered,
      };
    });
  }

  private async getCSVReportUpdatables(qualityProfileId: number) {
    const { data } = await this.client
      .rpc('get_changed_q', { quality_id: Number(qualityProfileId) })
      .select('*')
      .csv()
      .throwOnError();

    return data;
  }

  private async getCSVCompleteFiltered(filter: RulesFilter) {
    const { data } = await this.prepareFilteredQuery(filter).throwOnError();

    return this.reportGenerator.parseReport(<RulesResponse[]>data);
  }

  //TODO: maybe downloads should be another service
  /**
   *
   * @param showOnlyIsActiveDifferences If true will only include data that need to be updated in Sonar Qube
   * @param toUpdate
   */
  async downloadReport(
    filter: RulesFilter,
    showOnlyIsActiveDifferences = true
  ) {
    const data = showOnlyIsActiveDifferences
      ? await this.getCSVReportUpdatables(Number(filter.qualityProfile_id))
      : await this.getCSVCompleteFiltered(filter);

    // TODO: create an element and get wiht querySelector
    // TODO: or investigate how to pipe with rxjs
    const downloader = document.createElement('a');
    downloader.download = 'report';
    const url = URL.createObjectURL(new Blob([data], { type: 'text/csv' }));
    downloader.href = url;

    downloader.click();
    URL.revokeObjectURL(url);
    downloader.remove();
  }

  private changeIsActive(data: LocalRulesStatus[], newStatus = true) {
    if (!data.length) return;
    const [{ user_email }] = data;
    return this.client
      .from('status')
      .update({
        isActive: newStatus,
        updated_at: new Date(),
        user_email: user_email,
      })
      .in(
        'id',
        data.map(({ id }) => id)
      )
      .throwOnError();
  }

  private async bulkUpdateDescription(data: LocalRulesStatus[]) {
    if (!data.length) return;

    const { data: userData } = await this.client.auth.getUser();

    return await this.client
      .from('status')
      .upsert(
        data.map(({ id, description, qualityProfileId }) => ({
          id,
          description,
          qualityProfile_id: qualityProfileId,
          user_email: userData.user?.email,
        }))
      )
      .select()
      .throwOnError();
  }

  async postNewStatus(updateInfo: LocalRulesStatus[]) {
    const toFalse = updateInfo.filter(({ newStatus }) => !newStatus);
    const toTrue = updateInfo.filter(({ newStatus }) => newStatus);
    const description = updateInfo.filter(({ description }) => !!description);

    await Promise.all([
      this.changeIsActive(toFalse, false),
      this.changeIsActive(toTrue, true),
      this.bulkUpdateDescription(description),
    ]);
  }

  async getTotalCountByTable(tableName: string): Promise<number> {
    const { count } = await this.client
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .throwOnError();

    return count ?? 0;
  }

  private getQualityProfilesByLanguageQuery(languageId: string) {
    return this.client
      .from('qualityprofiles')
      .select()
      .eq('language_id', languageId)
      .throwOnError();
  }

  async getQualityProfilesByLanguage(
    languageId: string
  ): Promise<QualityProfileDTO[] | null> {
    const { data } = await this.getQualityProfilesByLanguageQuery(languageId);

    return data as QualityProfileDTO[];
  }

  private static queryBuilderColumns = {
    severity: 'rules.severity',
    type: 'rules.type',
    isActiveSonar: 'isActiveSonar',
    qualityProfile_id: 'qualityProfile_id',
  };

  // TODO: this is most likely a code smell, maybe separate to a util or  SRP class
  private buildQuery(
    query: PostgrestFilterBuilder<
      GenericSchema,
      Record<string, unknown>,
      Pojo[]
    >,
    filter: Partial<RulesFilter>
  ) {
    for (const key in filter) {
      if (!Object.prototype.hasOwnProperty.call(filter, key)) continue;

      const element = filter[key];

      if (element !== 'all' && isNill(element))
        query = query.eq(LocalSupabaseClient.queryBuilderColumns[key], element);
    }

    return query;
  }

  private prepareFilteredQuery(filter: RulesFilter) {
    delete filter.lang_id;

    const query = this.client.from('status').select(
      `
        *,
        qualityprofiles(
          *
        ),
        rules!inner(
          *
        )
      `,
      { count: 'exact' }
    );

    return this.buildQuery(query as any, filter);
  }

  getPaginatedRulesByFilterQuery(
    filter: RulesFilter,
    pagination: PaginationParams
  ) {
    return this.prepareFilteredQuery(filter)
      .range(...this.getRange(pagination))
      .order('id', { ascending: true })
      .throwOnError();
  }

  async getPaginatedRulesByFilter(
    filter: RulesFilter,
    pagination: PaginationParams
  ) {
    const { data, count } = await this.getPaginatedRulesByFilterQuery(
      filter,
      pagination
    );

    return { data: data as RulesResponse[], count };
  }

  getAllLanguagesQuery() {
    return this.client.from('languages').select().throwOnError();
  }

  async getAllLanguages(): Promise<LanguageDTO[] | null> {
    const { data } = await this.getAllLanguagesQuery();

    return (<LanguageDTO[]>data).filter(
      ({ name }) => LocalSupabaseClient.whiteList[name]
    );
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
      .ilike('rules.name', `%${rule}%`)
      // TODO: code duplicated, search for an abstraction
      .range(...this.getRange(pagination))
      .order('id', { ascending: true })
      .throwOnError();

    return {
      data: data as RulesResponse[],
      count,
    };
  }

  subscribeChanges(
    cb: (payload: RealtimePostgresUpdatePayload<RulesStatus>) => void
  ) {
    if (import.meta.env.VITE_IS_INTERCEPTOR_ON) return;

    return this.client
      .channel('changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'status',
        },
        cb
      )
      .subscribe();
  }
}

export default LocalSupabaseClient.getInstance;
