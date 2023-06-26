/// <reference types="vite/client" />

declare interface Window {
  queryClient: unknown;
  fetchClient: unknown;
  woopra: any;
  __woo: any;
  mockServer: unknown;
}

type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};

type Envs = RemoveIndex<ImportMetaEnv>;

type EnvKeys = keyof Envs;

type CustomEnvKeys = keyof Omit<
  Envs,
  'BASE_URL' | 'DEV' | 'PROD' | 'MODE' | 'SSR'
>;

declare interface ImportMetaEnv {
  VITE_IS_INTERCEPTOR_ON?: string;
  VITE_SUPABASE_URL?: string;
  VITE_TYPE_CLIENT?: string;
  VITE_SUPABASE_TOKEN?: string;
  VITE_WOOPRA_DOMAIN?: string;
}
