import { clientType } from "../config/supabase";
import AxiosFetchData  from "../service/axios";
import { FetchClientSingleton } from "../../types/fetchClient";
import LocalSupabaseClient from "../service/supabase";

 const clientsContainer: Record<string, ()=> FetchClientSingleton> = {
   axios: AxiosFetchData,
   supabase: LocalSupabaseClient
 }

 export const fetchClient: FetchClientSingleton = clientsContainer[clientType]()
