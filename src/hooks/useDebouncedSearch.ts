import { useState } from 'react';
import useSWR from 'swr';
import { useDebounceValue } from '.';
import { useDeferredValue } from 'react';
import { setSWRParam } from '../api';
import { AppConfig } from '../constants';

export const useDebouncedSearch = <T>(
  type: string,
  apiFunction: (query: string) => Promise<T>
) => {
  const [search, setSearch] = useState('');
  const [_isFocused, setFocused] = useState(false);

  const isFocused = useDeferredValue(_isFocused);
  const [debouncedSearch] = useDebounceValue(search, AppConfig.debounce.search);

  const { data, error, isLoading } = useSWR(
    setSWRParam(type, debouncedSearch),
    apiFunction
  );

  const showSpinner = isLoading || search !== debouncedSearch;

  return {
    search,
    setSearch,
    setFocused,
    isFocused,
    data,
    error,
    showSpinner,
  };
};
