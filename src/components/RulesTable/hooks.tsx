import supbaseLocal from '../../lib/service/supabase'
import { usePaginatedFetchData } from "../../hooks";

const client = supbaseLocal()

export const useGetRules = (qualityProfileName: string)=>{
  return usePaginatedFetchData(
    (page, {qualityProfileName})=> client
      .getPaginatedResutsByQualityProfile(qualityProfileName, {page}),
    {qualityProfileName}
  )
}

