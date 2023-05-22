import { useCallback } from "react";
import { setRuleTypeFilterChange } from "../../lib/observers";
import { FilterPopover } from "../../layout/FilterPopover";
import { filterTypeConfig } from "../../lib/config/filters";

export const TypesFilter = () => {
  const _handleChange = useCallback(
    (value: string) => setRuleTypeFilterChange(value),
    []
  );

  return (
    <FilterPopover
      filterConfig={filterTypeConfig}
      isClosingRecursive={true}
      reactiveCallback={_handleChange}
    />
  );
};
