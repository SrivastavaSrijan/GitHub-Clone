import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getRepositoryDetails, setSWRParam } from '../api';
import {
  Alert,
  OrganizationDetail,
  RepositoryItem,
  RepositorySkeleton,
} from '../components';

export const RepositoryDetailPage = () => {
  const { org, repo } = useParams();
  const areParamsValid = org && repo;
  const { data, error, isLoading } = useSWR(
    setSWRParam('org_details', areParamsValid ? org + repo : undefined),
    areParamsValid ? () => getRepositoryDetails(org, repo) : null
  );
  if (error) return <Alert />;
  return (
    <div className="container max-w-screen-lg mx-auto md:py-12 px-4 py-4">
      <div className="lg:grid lg:grid-cols-3 flex-col flex md:gap-12 gap-10 justify-start items-start">
        <OrganizationDetail />
        <div className="flex flex-col w-full col-span-2">
          {isLoading || !data || !areParamsValid ? (
            <RepositorySkeleton />
          ) : (
            <RepositoryItem {...data} />
          )}
        </div>
      </div>
    </div>
  );
};
