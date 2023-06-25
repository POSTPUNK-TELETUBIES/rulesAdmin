/// <reference types="vite/client" />

declare interface Window {
  queryClient: unknown;
  fetchClient: unknown;
  woopra: any;
  __woo: any;
}

declare interface ImportMetaEnv {
  VITE_IS_INTERCEPTOR_ON?: string;
}
