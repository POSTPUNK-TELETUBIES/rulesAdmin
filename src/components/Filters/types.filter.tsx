import { useCallback } from "react";
import { setRuleTypeFilterChange } from "../../lib/observers";
import { FilterPopover } from "../../layout/FilterPopover";
import { filterConfig } from "../../lib/config/filters";

export const TypesFilter = () => {
  const _handleChange = useCallback(
    (value: string) => setRuleTypeFilterChange(value),
    []
  );

  return (
    <FilterPopover
      filterConfig={filterConfig}
      isClosingRecursive={true}
      reactiveCallback={_handleChange}
    />
  );
};
