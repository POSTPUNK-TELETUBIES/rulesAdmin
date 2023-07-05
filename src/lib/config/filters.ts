import { Type, Severity } from '../../types/supabase';

export const filterTypeConfig = [
  { value: 'all', label: 'Todos' },
  ...Object.values(Type).map((value) => ({ value, label: value })),
];

export const filterSeverityConfig = [
  { value: 'all', label: 'Todos' },
  ...Object.values(Severity).map((value) => ({ value, label: value })),
];

export const filterStateConfig = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Activo' },
  { value: 'deactive', label: 'Inactivo' },
];
