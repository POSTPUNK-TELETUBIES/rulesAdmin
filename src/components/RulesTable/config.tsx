import { Schedule } from "@mui/icons-material";
import type { RuleDTO, RulesResponse } from "../../types/supabase";
import { ActivateFilter } from "../Filters/activate.filter";
import { SeverityProfileFilter } from "../Filters/severities.filter";
import { TypesFilter } from "../Filters/types.filter";

export interface ColumnConfig {
  label: string;
  resource: keyof Omit<RulesResponse & RuleDTO, "rules">;
  especialConfig?: boolean;
  icon?: JSX.Element;
  className?: string;
  filter?: JSX.Element;
  textAlign?: string;
}

export const columns: ColumnConfig[] = [
  { label: "Código", resource: "key", textAlign: "left" },
  { label: "Regla", resource: "name", textAlign: "left" },
  { label: "Tipo", resource: "type", filter: <TypesFilter /> },
  {
    label: "Severidad",
    resource: "severity",
    filter: <SeverityProfileFilter />,
  },
  { label: "Detalle", especialConfig: true, resource: "htmlDesc" },
  {
    label: "Estado Actual",
    resource: "isActiveSonar",
    especialConfig: true,
    className: "actualState",
    filter: <ActivateFilter />,
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
