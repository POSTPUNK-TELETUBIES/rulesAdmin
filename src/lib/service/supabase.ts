import {SupabaseClient, createClient} from '@supabase/supabase-js'
import { supabaseURL, supbaseToken } from '../config/supabase'
import { Database, LanguageDTO, QualityProfileDTO, RulesResponse } from '../../types/supabase'
import { FetchClientSingleton, PaginationParams, RulesFilter } from '../../types/fetchClient'

export class LocalSupabaseClient implements FetchClientSingleton{
  private static instance: LocalSupabaseClient

  private constructor(private client: SupabaseClient<Database>){}

  getTotalCountByTable(tableName: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  getQualityProfilesByLanguage(languageId: string): Promise<QualityProfileDTO[] | null> {
    throw new Error('Method not implemented.')
  }

  getPaginatedRulesByFilter(filter: RulesFilter, pagination: PaginationParams): Promise<RulesResponse[] | null> {
    throw new Error('Method not implemented.')
  }

  getAllLanguages(): Promise<LanguageDTO[] | null> {
    throw new Error('Method not implemented.')
  }

  static getInstance(){
    LocalSupabaseClient.instance ??=  new LocalSupabaseClient(
      createClient<Database>(supabaseURL, supbaseToken)
    )

    return LocalSupabaseClient.instance
  }

  private getRange({page, limit = 10}: PaginationParams): [number, number]{
    return [(page-1)*limit, page*limit - 1]
  }

  async getPaginatedResutsByQualityProfile(
    qualityProfileKey: string,
    pagination: PaginationParams
  ){
    const  [{data , error}, {count: total}] = await Promise.all([
      this.client
      .from('status')
      .select(`
        *,
        rules(
          *
        )
      `)
      .range(...this.getRange(pagination))
      .eq('qualityProfile_id', qualityProfileKey),
      this.getTotalByTable('status')
    ])
  
    return {data: data as RulesResponse[], total, page: pagination.page, error}
  }

  private async getTotalByTable(tableName: string){
    return await this.client.from(tableName)
      .select('*', {count: 'exact', head: true})
      .throwOnError()
  }

  async getPaginatedQualityProfiles(pagination: PaginationParams){
    const [{data, error}, {count: total}] = await Promise.all([
      this.client
      .from('qualityprofiles')
      .select()
      .range(...this.getRange(pagination)),
      this.getTotalByTable('qualityprofiles')
    ])

    return {data, total, page: pagination.page, error}
  }
  
}


export default LocalSupabaseClient.getInstance
