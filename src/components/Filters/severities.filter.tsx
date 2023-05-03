import { useCallback } from "react";
import { Severity } from "../../types/supabase";
import { setSeverityFilterChange } from "../../lib/observers";
import { FilterPopover } from "../../layout/FilterPopover";

const filterConfig = [
  { value: "all", label: "Todos" },
  ...Object.values(Severity).map((value) => ({ value, label: value })),
];

export const SeverityProfileFilter = () => {
  const _handleChange = useCallback((value: string) => {
    setSeverityFilterChange(value);
  }, []);

  return (
    <FilterPopover
      filterConfig={filterConfig}
      isClosingRecursive={true}
      reactiveCallback={_handleChange}
    />
  );
};
