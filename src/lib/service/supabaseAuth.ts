import { Session, createClient } from "@supabase/supabase-js";
import { AuthClient } from "../../types/fetchClient";
import { Database } from "../../types/supabase";
import { supabaseURL, supbaseToken } from "../config/supabase";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

interface TokenDataI {
  token: string;
  refreshToken: string;
}

interface AuthStorage {
  tokenData: TokenDataI;
}

export class AuthLocalStorageSingleton implements AuthStorage {
  private static instance: AuthLocalStorageSingleton;

  private constructor() {
    if (AuthLocalStorageSingleton.instance) throw new Error("Singleton");
  }

  static getInstance() {
    AuthLocalStorageSingleton.instance ??= new AuthLocalStorageSingleton();

    return AuthLocalStorageSingleton.instance;
  }

  get tokenData() {
    return {
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  }

  set tokenData(data: TokenDataI) {
    Object.keys(data).forEach((dataKey) =>
      localStorage.setItem(dataKey, data[dataKey])
    );
  }
}

export class SupabaseAuthSingleton implements AuthClient {
  private static instance: SupabaseAuthSingleton;
  public isLogged: boolean;

  private constructor(
    private client: SupabaseAuthClient,
    private authStorage: AuthStorage = AuthLocalStorageSingleton.getInstance()
  ) {}

  public static getInstance(client?: SupabaseAuthClient) {
    SupabaseAuthSingleton.instance ??= new SupabaseAuthSingleton(
      client ?? createClient<Database>(supabaseURL, supbaseToken).auth
    );

    return SupabaseAuthSingleton.instance;
  }

  private setToken(session: Session) {
    this.authStorage.tokenData = {
      refreshToken: session.refresh_token,
      token: session.access_token,
    };
  }

  async login(email: string, password: string) {
    const { data, error } = await this.client.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    this.setToken(data.session);

    this.isLogged = true;

    return data;
  }

  async verifyAuth(token?: string) {
    const { data, error } = await this.client.getUser(token);

    if (error) throw error;

    return data;
  }

  async logOut(extraData?: unknown) {
    const { error } = await this.client.signOut();

    if (error) throw error;

    return extraData;
  }

  async getPermissions() {
    const { data, error } =
      await this.client.mfa.getAuthenticatorAssuranceLevel();

    if (error) throw error;

    return data;
  }

  async checkAuth(token?: string, refreshToken?: string) {
    const access_token = token ?? this.authStorage.tokenData.token;
    const refresh_token =
      refreshToken ?? this.authStorage.tokenData.refreshToken;

    if (!access_token || !refresh_token) return;

    const { data, error } = await this.client.setSession({
      access_token,
      refresh_token,
    });

    if (error) throw error;

    this.setToken(data.session);

    this.isLogged = true;

    return data;
  }
}

export default SupabaseAuthSingleton.getInstance;
