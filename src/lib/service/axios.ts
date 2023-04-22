import axios, { AxiosInstance } from "axios";
import { FetchClient, PaginationParams, Pojo } from "../../types/fetchClient";
import { RulesResponse } from "../../types/supabase";
import { supabaseURL, supbaseToken } from "../config/supabase";

export class AxiosFetchData implements FetchClient {
  private static instance: AxiosFetchData
  private constructor(private client: AxiosInstance){}

  static getInstance(){
    AxiosFetchData.instance ??= new AxiosFetchData(
      axios.create({
        baseURL: supabaseURL,
        headers: {
          apiKey: supbaseToken
        }
      })
    )

    return AxiosFetchData.instance
  }

  async getPaginatedResutsByQualityProfile(qualityProfileKey: string, pagination: PaginationParams): Promise<{ data: RulesResponse[]; total: number | null; page: number; error: unknown; }> {
    const { data } = await this.client.get('/qualityprofiles', {
      params: {

      }
    })

    return data
  }
  async getPaginatedQualityProfiles({page, limit =10}: PaginationParams): Promise<{ data: Pojo[] | null; total: number | null; page: number; error: unknown; }> {
    const { data } = await this.client.get('/qualityprofiles', {
      params: {
        limit,
        offset: (page - 1)*limit
      }
    })

    return data
  }
  
}
