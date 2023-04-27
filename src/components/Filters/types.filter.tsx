import { Type } from "../../types/supabase";
import { useCallback } from "react";
import { setRuleTypeFilterChange } from "../../lib/observers";
import { FilterPopover } from "../../layout/FilterPopover";

const filterConfig = [
  { value: "all", label: "Todos" },
  ...Object.values(Type).map((value) => ({ value, label: value })),
];

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
