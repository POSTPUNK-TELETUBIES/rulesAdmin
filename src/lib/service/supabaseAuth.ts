import { User, createClient } from '@supabase/supabase-js';
import { AuthClient } from '../../types/fetchClient';
import { Database } from '../../types/supabase';
import { supabaseURL, supbaseToken } from '../config/supabase';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { SingUpFields } from '../../types/auth';

export class SupabaseAuthSingleton implements AuthClient {
  private static instance: SupabaseAuthSingleton;
  public isLogged: boolean;
  user: User;

  private constructor(private client: SupabaseAuthClient) {}

  async singUp({
    email,
    firstName,
    lastName,
    password,
    username,
  }: SingUpFields) {
    const { data, error } = await this.client.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          username,
        },
      },
    });

    if (error) throw error;

    return data;
  }

  public static getInstance(client?: SupabaseAuthClient) {
    SupabaseAuthSingleton.instance ??= new SupabaseAuthSingleton(
      client ?? createClient<Database>(supabaseURL, supbaseToken).auth
    );

    return SupabaseAuthSingleton.instance;
  }

  async login(email?: string, password?: string) {
    if (!email || !password) throw new Error('Not valid email or password');

    const { data, error } = await this.client.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    this.isLogged = true;

    this.user = data.user;

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

    this.user = null;

    return extraData;
  }

  async getPermissions() {
    const { data, error } =
      await this.client.mfa.getAuthenticatorAssuranceLevel();

    if (error) throw error;

    return data;
  }
}

export default SupabaseAuthSingleton.getInstance;
