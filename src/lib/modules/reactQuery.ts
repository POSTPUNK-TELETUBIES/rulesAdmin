import { QueryClient } from "@tanstack/react-query";

export const reactQueryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      _optimisticResults: 'optimistic'
    }
  }
})

import.meta.env.DEV && 
  (()=> { window.queryClient = reactQueryClient})()
