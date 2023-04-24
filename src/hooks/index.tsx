import { type Dispatch, useMemo, useState, type SetStateAction } from "react"
import { useActiveFilter, useLanguageFilter, useQualityProfileFilter, useRuleTypeFilter, useSeverityFilter } from "../lib/observers"
import { useQuery } from "@tanstack/react-query"
import { fetchClient } from "../lib/modules/fetchClient"
import { RuleDTO, type RulesStatus } from "../types/supabase"

interface UseGetRulesStatusData {
  data?: (RulesStatus & RuleDTO)[];
  isLoading: boolean;
  total?: number;
  page: number;
}

type UseGetRulesStatusResults = [Dispatch<SetStateAction<number>>, UseGetRulesStatusData]

export const useGetRulesStatus = (): UseGetRulesStatusResults=>{
  const severity = useSeverityFilter()
  const lang_id = useLanguageFilter()
  const isActiveSonar = useActiveFilter()
  const qualityProfile_id = useQualityProfileFilter()
  const type = useRuleTypeFilter()

  const [ page, setPage ] = useState(1)

  const isAvailabletoShow = Boolean(lang_id && qualityProfile_id)

  const {data, isFetching} = useQuery({
    queryKey: ['rules', lang_id, qualityProfile_id, type, isActiveSonar, severity],
    queryFn: ()=> fetchClient.getPaginatedRulesByFilter({
      severity,
      lang_id,
      isActiveSonar,
      qualityProfile_id,
      type
    },{
      page,
    }),
    enabled: Boolean(lang_id && qualityProfile_id),
    keepPreviousData: true
  })

  // TODO: validar si se peude usar useQueriessssss (plural)
  const { data: total, isFetching: isFetchingCount } = useQuery({
    queryKey: ['totalRules'],
    queryFn: () => fetchClient.getTotalCountByTable('status'),
  })


  //TODO: el parse de data no es responsabildiad de este componente, cambiar a como viene la data
  const flatedResults = useMemo(()=> !isAvailabletoShow? [] : data
    ?.map(({rules, ...rest})=> ({...rules, ...rest})), [data, isAvailabletoShow])


  return [setPage, {data: flatedResults,  isLoading: isFetching || isFetchingCount, total, page}]

}
