import { LocalRulesStatus } from "../lib/service/dexie";
import { LanguageDTO, QualityProfileDTO, RulesResponse } from "./supabase";

export interface PaginationParams {
  page: number,
  limit?: number,
}

export interface Pojo {
  [x: string]: any;
}

export interface RulesFilter {
  lang_id: string;
  qualityProfile_id: string;
  severity: string;
  type: string;
  isActiveSonar: boolean | string;
}

export interface FetchClientSingleton{
  getQualityProfilesByLanguage(languageId: string): Promise<QualityProfileDTO[] | null>

  getAllLanguages(): Promise<LanguageDTO[] | null>

  getPaginatedRulesByFilter(filter: RulesFilter, pagination?: PaginationParams): Promise<RulesResponse[] | null>

  getTotalCountByTable(tableName: string): Promise<number>

  getStatusCount(filter: RulesFilter): Promise<number>

  postNewStatus(updateInfo: LocalRulesStatus[]): Promise<void>
}
