import { useCallback } from 'react';
import { setSeverityFilterChange } from '../../lib/observers';
import { filterSeverityConfig } from '../../lib/config/filters';
import { FilterPopover } from '../../layout/Filters/FilterContent';

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
