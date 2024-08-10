import { Link } from 'react-router-dom';
import { RoutesConfig } from '../constants';
import { searchOrganizations } from '../api';
import { SearchInput } from './SearchInput';
import { Alert } from './Alert';

export const SearchOrganizations = () => {
  return (
    <SearchInput<ReturnType<typeof searchOrganizations>>
      type="search_orgs"
      callback={searchOrganizations}
      InputComponent={({ search, setSearch, isFocused }) => (
        <input
          id="search"
          autoComplete="off"
          value={search}
          className={`${
            isFocused ? 'md:w-96 w-64' : 'w-56'
          } input input-bordered bg-transparent text-sm transition-[width] duration-200`}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      ResultComponent={({ data, setSearch }) => (
        <ul className="menu flex flex-col bg-base-100  mt-3 flex-nowrap max-h-56 overflow-y-auto dropdown-content  z-[1] w-full shadow">
          {data?.items.length === 0 && (
            <Alert message="No organizations found" type="info" />
          )}
          {(data?.items ?? []).map(({ id, login, avatar_url }) => (
            <li key={id}>
              <Link
                onClick={() => setSearch('')}
                to={RoutesConfig.REPOSITORY_LIST.replace(':org', login)}
              >
                <img
                  src={avatar_url}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <p>{login}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    />
  );
};
