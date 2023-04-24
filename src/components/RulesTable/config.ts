import type { RuleDTO, RulesResponse } from "../../types/supabase";

export interface ColumnConfig {
  label: string;
  resource: keyof Omit<RulesResponse & RuleDTO, 'rules'>;
  especialConfig?: boolean,
}

export const columns: readonly ColumnConfig[] = Object.freeze([
  {label: 'Condigo de regla', resource: 'key'},
  {label: 'Regla', resource: 'name'},
  {label: 'Tipo', resource: 'type'},
  {label: 'severidad', resource: 'severity'},
  {label: 'Detalle', especialConfig: true, resource: 'htmlDesc'},
  {label: 'Estado actual sonar', resource: 'isActiveSonar', especialConfig: true},
  {label: 'Estado propuesto', resource: 'isActive', especialConfig: true},
])
