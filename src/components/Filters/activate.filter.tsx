import { useCallback } from 'react';
import { setActivateFilterChange } from '../../lib/observers';
import { filterStateConfig } from '../../lib/config/filters';
import { FilterPopover } from '../../layout/Filters/FilterContent';

const parsedValues = Object.freeze({
  all: null,
  active: true,
  deactive: false,
});

export const ActivateFilter = () => {
  const _handleChange = useCallback((value: string) => {
    setActivateFilterChange(parsedValues[value]);
  }, []);

  return (
    <FilterPopover
      filterConfig={filterStateConfig}
      isClosingRecursive={true}
      reactiveCallback={_handleChange}
    />
  );
};
