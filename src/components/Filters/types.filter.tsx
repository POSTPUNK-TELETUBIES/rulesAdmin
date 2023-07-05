import { useCallback } from 'react';
import { setRuleTypeFilterChange } from '../../lib/observers';
import { filterTypeConfig } from '../../lib/config/filters';
import { FilterPopover } from '../../layout/Filters/FilterContent';

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
