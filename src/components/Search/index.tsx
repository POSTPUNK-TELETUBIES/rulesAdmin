import { Search as SearchIcon } from '@mui/icons-material';
import { Input } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  setTextmatchFilter,
  useLanguageFilter,
  useQualityProfileFilter,
} from '../../lib/observers';

export const Search = () => {
  const language = useLanguageFilter();
  const qProfile = useQualityProfileFilter();

  const [value, setValue] = useState<string | null>();
  const [debouncedValue] = useDebounce(value, 1000);

  const isActive = useMemo(() => language && qProfile, [language, qProfile]);

  const _handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    []
  );

  useEffect(() => {
    setValue('');
    setTextmatchFilter();
  }, [language, qProfile]);

  useEffect(() => {
    setTextmatchFilter(debouncedValue);
  }, [debouncedValue]);

  return (
    <Input
      value={value}
      disabled={!isActive}
      onChange={_handleChange}
      startAdornment={<SearchIcon />}
    />
  );
};
