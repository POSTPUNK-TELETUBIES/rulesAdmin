import { LocalRulesStatus } from "../lib/service/dexie";
import { SingUpFields } from "./auth";
import { LanguageDTO, QualityProfileDTO, RulesResponse } from "./supabase";

export interface PaginationParams {
  page: number;
  limit?: number;
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

export interface PaginationResult {
  data: RulesResponse[] | null;
  count: number;
}

export interface FetchClientSingleton {
  getQualityProfilesByLanguage(
    languageId: string
  ): Promise<QualityProfileDTO[] | null>;

  getAllLanguages(): Promise<LanguageDTO[] | null>;

  getPaginatedRulesByFilter(
    filter: RulesFilter,
    pagination?: PaginationParams
  ): Promise<PaginationResult>;

  getTotalCountByTable(tableName: string): Promise<number>;

  postNewStatus(updateInfo: LocalRulesStatus[]): Promise<void>;

  downloadReport(
    filter: Partial<RulesFilter>,
    toUpdate?: boolean
  ): Promise<void>;

  getByRuleName(
    rule: string,
    filter: RulesFilter,
    pagination: PaginationParams
  ): Promise<PaginationResult>;
}

export interface AuthClient {
  isLogged: boolean;
  login(email: string, password: string): Promise<any>;
  verifyAuth?(token?: string, extraData?: unknown): Promise<unknown>;
  logOut?(token: string, extraData?: unknown): Promise<unknown>;
  getPermissions?(token?: string, extraData?: unknown): Promise<unknown>;
  checkAuth(token?: string, refreshToken?: string): Promise<any>;
  singUp(data: SingUpFields): Promise<unknown>;
}
