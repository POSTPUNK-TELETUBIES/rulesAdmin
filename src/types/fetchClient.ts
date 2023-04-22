import { RulesResponse } from "./supabase";

export interface PaginationParams {
  page: number,
  limit?: number,
}

export interface Pojo {
  [x: string]: any;
}

export interface FetchClient{
  getPaginatedResutsByQualityProfile(
    qualityProfileKey: string,
    pagination: PaginationParams
  ):Promise<{
    data: RulesResponse[];
    total: number | null;
    page: number;
    error: unknown
  }>

  getPaginatedQualityProfiles(pagination: PaginationParams):Promise<{
    data: Pojo[] | null;
    total: number | null;
    page: number;
    error: unknown
  }>

}
