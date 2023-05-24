import { RulesResponse } from './supabase';

export interface IReportGenerator {
  parseReport(data: RulesResponse[]): string;
}
