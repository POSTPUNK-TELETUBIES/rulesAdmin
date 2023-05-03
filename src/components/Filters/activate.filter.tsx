import { useCallback } from "react";
import { setActivateFilterChange } from "../../lib/observers";
import { FilterPopover } from "../../layout/FilterPopover";

const parsedValues = Object.freeze({
  all: null,
  active: true,
  deactive: false,
});

const filterConfig = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activo" },
  { value: "deactive", label: "Inactivo" },
];

export const ActivateFilter = () => {
  const _handleChange = useCallback((value: string) => {
    setActivateFilterChange(parsedValues[value]);
  }, []);

  return (
    <FilterPopover
      filterConfig={filterConfig}
      isClosingRecursive={true}
      reactiveCallback={_handleChange}
    />
  );
};
