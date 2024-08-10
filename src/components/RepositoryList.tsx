import useSWR from 'swr';
import { searchRepositoriesInOrg, setSWRParam } from '../api';

import { RepositoryToolbar } from './RepositoryToolbar';
import { Alert } from './Alert';
import { useRepositoryQueryParams } from '../hooks';
import { useMemo } from 'react';
import { Pagination } from './Pagination';
import { RepositoryItem, RepositorySkeleton } from './RepositoryItem';
import { APIDefaults } from '../constants';

export const RepositoryList = () => {
  const queryParams = useRepositoryQueryParams();

  const fetchRepos = () => {
    if (queryParams) return searchRepositoriesInOrg({ ...queryParams });
  };

  const swrKey = useMemo(() => {
    return JSON.stringify(queryParams);
  }, [queryParams]);

  const { data, error, isLoading } = useSWR(setSWRParam(swrKey), fetchRepos);

  if (error) return <Alert />;
  return (
    <div className="flex flex-col w-full col-span-2">
      <RepositoryToolbar />
      <div className="divider max-w-screen-sm" />
      {isLoading ? (
        <div className="flex flex-col gap-6 mb-3">
          {[...Array(APIDefaults.searchRepoWithinOrg.per_page)].map(
            (_val, i) => (
              <RepositorySkeleton key={i} />
            )
          )}
        </div>
      ) : (
        (data?.items ?? [])?.map((value) => (
          <RepositoryItem {...value} key={value.id} />
        ))
      )}
      {!isLoading && data?.items?.length === 0 && (
        <Alert message="No repositories found" type="info" />
      )}
      <div className="relative">
        {isLoading && (
          <div className="skeleton  h-12 z-10  w-full absolute rounded-sm" />
        )}
        <Pagination totalPages={Math.ceil((data?.total_count ?? 1) / 10)} />
      </div>
    </div>
  );
};
