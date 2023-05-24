import { useCallback } from "react";
import { setSeverityFilterChange } from "../../lib/observers";
import { FilterPopover } from "../../layout/FilterPopover";
import { filterSeverityConfig } from "../../lib/config/filters";

export const SeverityProfileFilter = () => {
  const _handleChange = useCallback((value: string) => {
    setSeverityFilterChange(value);
  }, []);

  return (
    <FilterPopover
      filterConfig={filterSeverityConfig}
      isClosingRecursive={true}
      reactiveCallback={_handleChange}
    />
  );
};
