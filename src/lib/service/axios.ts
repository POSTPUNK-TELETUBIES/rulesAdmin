import axios, { AxiosInstance } from "axios";
import { FetchClientSingleton, PaginationParams, RulesFilter } from "../../types/fetchClient";
import { LanguageDTO, QualityProfileDTO, RulesResponse } from "../../types/supabase";
import { supabaseURL, supbaseToken } from "../config/supabase";
import { LocalRulesStatus } from "./dexie";

export class AxiosFetchData implements FetchClientSingleton {
  private static instance: AxiosFetchData
  private constructor(private client: AxiosInstance){}
  postNewStatus(_updateInfo: LocalRulesStatus[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
 
  async getTotalCountByTable(_tableName: string) {
    return 100
  }

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

  async getPaginatedRulesByFilter(filter: RulesFilter, pagination: PaginationParams): Promise<RulesResponse[] | null> {
    const { data } = await this.client.get('/rules', {
      params:{
        ...filter,
        ...pagination
      }
    })

    return data
  }

  async getQualityProfilesByLanguage(languageId: string): Promise<QualityProfileDTO[] | null> {
    const { data } = await this.client.get('/qualityprofiles', {
      params: {
        language_id: languageId
      }
    })

    return data
  }

  async getAllLanguages(): Promise<LanguageDTO[] | null> {
    const { data } = await this.client.get('/languages')

    return data
  }
}

export default AxiosFetchData.getInstance
