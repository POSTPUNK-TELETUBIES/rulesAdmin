import { SupabaseClient, createClient } from '@supabase/supabase-js'
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import { supabaseURL, supbaseToken } from '../config/supabase'
import { Database, LanguageDTO, QualityProfileDTO, RulesResponse } from '../../types/supabase'
import { FetchClientSingleton, PaginationParams, Pojo, RulesFilter } from '../../types/fetchClient'
import { LocalRulesStatus } from './dexie'

export class LocalSupabaseClient implements FetchClientSingleton{
  private static instance: LocalSupabaseClient

  private constructor(private client: SupabaseClient<Database>){}

  private changeIsActive(data:LocalRulesStatus[], newStatus = true ){
    if(data.length)
      return this.client
        .from('status')
        .update({
          isActive: newStatus,
          updated_at: new Date()
        })
        .in('id', data.map(({id})=> id))
        .throwOnError()
  }

  async postNewStatus(updateInfo: LocalRulesStatus[]) {
    const toFalse = updateInfo.filter(({newStatus})=> !newStatus)
    const toTrue = updateInfo.filter(({newStatus})=> newStatus)

    await Promise.all([
      this.changeIsActive(toFalse, false),
      this.changeIsActive(toTrue, true)
    ])
  }

  async getTotalCountByTable(tableName: string): Promise<number> {
    const { count } =  await this.client.from(tableName)
      .select('*', {count: 'exact', head: true})
      .throwOnError()

    return count ?? 0
  }

  async getQualityProfilesByLanguage(languageId: string): Promise<QualityProfileDTO[] | null> {
    const { data } = await this.client
      .from('qualityprofiles')
      .select()
      .eq('language_id', languageId )
      .throwOnError()

    return data as QualityProfileDTO[]
  }

  private static queryBuilderColumns = {
    severity: 'rules.severity',
    type: 'rules.type',
    isActiveSonar: 'isActiveSonar',
    qualityProfile_id: 'qualityProfile_id',
  }

  private buildQuery(query: PostgrestFilterBuilder<any, any, Pojo[]>, filter: Partial<RulesFilter>){
    for (const key in filter) {
      if (!Object.prototype.hasOwnProperty.call(filter, key)) 
        continue
      
      const element = filter[key];

      if(element !== 'all' && element != null)
        query = query.eq(LocalSupabaseClient.queryBuilderColumns[key], element)
    }
   
    return query
  }

  async getPaginatedRulesByFilter(
    filter: RulesFilter, 
    pagination: PaginationParams
  ) {   
    delete filter.lang_id
  
    const query = this.client
    .from('status')
    .select(`
      *,
      qualityprofiles(
        *
      ),
      rules!inner(
        *
      )
    `, {count: 'exact'})

  

    const {data, count } = await this.buildQuery(query, filter)
          .throwOnError()
          .range(...this.getRange(pagination))
      
    return { data: data as RulesResponse[], count}
  }

  async getAllLanguages(): Promise<LanguageDTO[] | null> {
    const { data } = await this.client
      .from('languages')
      .select()
      .throwOnError()

    return data as LanguageDTO[]
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
}

export default LocalSupabaseClient.getInstance

