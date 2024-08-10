import { ChangeEvent, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortOptions } from '../interfaces';
import { useDebounceCallback } from '../hooks';
import { AppConfig } from '../constants';

export const RepositoryToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localParams, setLocalParams] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    sort: searchParams.get('sort') || '',
  });

  const debouncedSetSearchParams = useDebounceCallback(
    useCallback(
      (value: Record<string, string>) => {
        setSearchParams(value);
      },
      [setSearchParams]
    ),
    AppConfig.debounce.query
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Update localParams for immediate UI update
    setLocalParams((prev) => {
      const newValue = { ...prev, [name]: value };
      debouncedSetSearchParams(newValue);

      return newValue;
    });
  };

  return (
    <div className="join  w-full">
      <input
        autoComplete="off"
        className="input w-full input-bordered join-item input-sm"
        placeholder="Type to search..."
        value={localParams.search}
        name="search"
        onChange={handleChange}
      />

      <select
        value={localParams.sort}
        name="sort"
        onChange={handleChange}
        className="select  md:w-full w-56 md:text-sm text-xs select-bordered join-item select-sm"
      >
        {Object.entries(SortOptions).map(([key, val]) => (
          <option key={val} value={val}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
