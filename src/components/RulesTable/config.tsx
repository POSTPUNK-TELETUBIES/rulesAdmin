import { Schedule } from '@mui/icons-material';
import type { RuleDTO, RulesResponse } from '../../types/supabase';
import { ActivateFilter } from '../Filters/activate.filter';
import { SeverityProfileFilter } from '../Filters/severities.filter';
import { TypesFilter } from '../Filters/types.filter';

export interface ColumnConfig {
  label: string;
  resource: keyof Omit<RulesResponse & RuleDTO, 'rules'>;
  especialConfig?: boolean;
  icon?: JSX.Element;
  className?: string;
  filter?: JSX.Element;
  textAlign?: string;
  sxProps?: Record<string, unknown>;
}

export const columns: ColumnConfig[] = [
  { label: '', especialConfig: true, resource: 'htmlDesc' },
  { label: 'Código', resource: 'key', textAlign: 'left' },
  { label: 'Regla', resource: 'name', textAlign: 'left' },
  {
    label: 'Tipo',
    resource: 'type',
    filter: <TypesFilter />,
    textAlign: 'left',
  },
  {
    label: 'Severidad',
    resource: 'severity',
    textAlign: 'left',
    filter: <SeverityProfileFilter />,
  },
  {
    label: 'E. Actual',
    resource: 'isActiveSonar',
    especialConfig: true,
    className: 'actualState',
    textAlign: 'left',
    filter: <ActivateFilter />,
    sxProps: { minWidth: 100 },
  },
  {
    label: 'E. Propuesto',
    resource: 'isActive',
    especialConfig: true,
    className: 'proposedState',
    sxProps: { minWidth: 100 },
  },
  {
    label: 'Propuesta',
    resource: 'updated_at',
    especialConfig: true,
    icon: <Schedule sx={{ color: (theme) => theme.palette.common.white }} />,
  },
  {
    label: 'Autor',
    resource: 'user_email',
  },
];
