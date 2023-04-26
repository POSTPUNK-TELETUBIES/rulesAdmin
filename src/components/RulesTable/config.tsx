import { Schedule } from "@mui/icons-material";
import type { RuleDTO, RulesResponse } from "../../types/supabase";

export interface ColumnConfig {
  label: string;
  resource: keyof Omit<RulesResponse & RuleDTO, "rules">;
  especialConfig?: boolean;
  icon?: JSX.Element;
  className?: string;
}

export const columns: ColumnConfig[] = [
  { label: "Código", resource: "key" },
  { label: "Regla", resource: "name" },
  { label: "Tipo", resource: "type" },
  { label: "Severidad", resource: "severity" },
  { label: "Detalle", especialConfig: true, resource: "htmlDesc" },
  {
    label: "Estado Actual",
    resource: "isActiveSonar",
    especialConfig: true,
    className: "actualState",
  },
  {
    label: "Estado Propuesto",
    resource: "isActive",
    especialConfig: true,
    className: "proposedState",
  },
  {
    label: "Última Propuesta: ",
    resource: "updated_at",
    especialConfig: true,
    icon: <Schedule sx={{ color: (theme) => theme.palette.common.white }} />,
  },
];
