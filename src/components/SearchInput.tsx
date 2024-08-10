import { Dispatch, SetStateAction } from 'react';
import { useDebouncedSearch } from '../hooks';
import { Alert } from './Alert';

interface ISearchInputProps<T> {
  type: string;
  callback: (query: string) => T;
  ResultComponent: React.FC<{
    data?: Awaited<T>;
    setSearch: Dispatch<SetStateAction<string>>;
  }>;
  InputComponent: React.FC<{
    search: string;
    isFocused: boolean;
    setSearch: Dispatch<SetStateAction<string>>;
  }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchInput = <T extends Promise<any>>({
  type,
  callback,
  InputComponent,
  ResultComponent,
}: ISearchInputProps<T>) => {
  const { search, setSearch, setFocused, isFocused, data, error, showSpinner } =
    useDebouncedSearch(type, callback);
  if (error) return <Alert />;
  return (
    <div className="flex flex-row">
      <details
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="dropdown"
        open={!showSpinner && !!search && isFocused}
      >
        <summary className="btn p-0 m-1">
          <div className="flex items-center gap-1">
            {showSpinner && (
              <span className="loading loading-spinner loading-xs absolute z-[2] top-5 right-5" />
            )}
            <InputComponent
              isFocused={isFocused}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </summary>

        <ResultComponent data={data} setSearch={setSearch} />
      </details>
    </div>
  );
};
