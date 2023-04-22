import { useCallback, useEffect, useRef, useState } from "react"


interface Results<T = unknown> {
  data: T[] | null;
  total: number | null;
  page: number;
}

interface UseGetResponseData<T = unknown> {
  results: Results<T> | null;
  isLoading: boolean;
}

type UsePaginatedResponse<K extends Record<string, unknown>, T =unknown> = [(config?: K) => Promise<Results<T>>,  UseGetResponseData<T>]

export function usePaginatedFetchData< K extends Record<string, unknown>, T = unknown,>(
  resultCallback: (page: number, config: K)=> Promise<Results<T>>, 
  initialConfig: K
): UsePaginatedResponse<K, T>{
  const [isLoading, setIsLoading ] = useState(false)
  const [results, setResults] = useState<Results<T> | null>(null)
  const pageRef = useRef(1)

  const _handleGetResults = useCallback(
    async (page:number, config?:K)=>{
      setIsLoading(true)
      const results = await resultCallback(page, {
        ...initialConfig,
        ...config
      })
      setResults(results)
      setIsLoading(false)

      return results
  }, [initialConfig, resultCallback])

  const fetchNext = useCallback(async (config?: K) => {
    pageRef.current++
    return await _handleGetResults(pageRef.current, config)
  }, [_handleGetResults])


  useEffect(()=> {
    _handleGetResults(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return [fetchNext, {results, isLoading}]
}


