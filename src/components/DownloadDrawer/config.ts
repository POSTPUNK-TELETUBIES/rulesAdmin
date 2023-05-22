import {
  filterSeverityConfig,
  filterStateConfig,
  filterTypeConfig,
} from "../../lib/config/filters";

export const uncontrolledLocalFilters = [
  {
    id: "type-uncontrolled",
    label: "Type",
    registerField: "type",
    config: filterTypeConfig,
  },
  {
    id: "severity-uncontrolled",
    label: "Severity",
    registerField: "severity",
    config: filterSeverityConfig,
  },
  {
    id: "state-uncontrolled",
    label: "State",
    registerField: "state",
    config: filterStateConfig,
  },
];
