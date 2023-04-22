import {SupabaseClient, createClient} from '@supabase/supabase-js'
import { supabaseURL, supbaseToken } from '../config/supabase'
import { Database, RulesResponse } from '../../types/supabase'
import { FetchClient, PaginationParams } from '../../types/fetchClient'

export class LocalSupbaseClient implements FetchClient{
  private static instance: LocalSupbaseClient
  private constructor(private client: SupabaseClient<Database>){}

  static getInstance(){
    LocalSupbaseClient.instance ??=  new LocalSupbaseClient(
      createClient<Database>(supabaseURL, supbaseToken)
    )

    return LocalSupbaseClient.instance
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


export default LocalSupbaseClient.getInstance
