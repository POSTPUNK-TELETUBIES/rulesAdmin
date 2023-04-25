import { Schedule } from '@mui/icons-material'
import type { RuleDTO, RulesResponse } from "../../types/supabase";

export interface ColumnConfig {
  label: string;
  resource: keyof Omit<RulesResponse & RuleDTO, 'rules'>;
  especialConfig?: boolean,
  icon?: JSX.Element
}

export const columns:  ColumnConfig[] = [
  { label: 'Condigo de regla', resource: 'key' },
  { label: 'Regla', resource: 'name' },
  { label: 'Tipo', resource: 'type' },
  { label: 'severidad', resource: 'severity' },
  { label: 'Detalle', especialConfig: true, resource: 'htmlDesc' },
  { label: 'Estado actual sonar', resource: 'isActiveSonar', especialConfig: true },
  { label: 'Estado propuesto', resource: 'isActive', especialConfig: true },
  { label: 'Actualizacion ', resource: 'updated_at', especialConfig: true, icon: <Schedule /> }
]
