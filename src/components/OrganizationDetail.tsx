import useSWR from 'swr';
import { getUserDetails, setSWRParam } from '../api';
import { Alert } from './Alert';
import { useParams } from 'react-router-dom';

export const OrganizationDetail = () => {
  const { org } = useParams();
  const { data, error, isLoading } = useSWR(
    setSWRParam('org_details', org),
    getUserDetails
  );
  const { bio, following, followers, name, location } = data ?? {};
  if (error) return <Alert />;
  return (
    <div className="flex flex-col flex-1 w-full items-center gap-4">
      {isLoading ? (
        <div className="flex flex-col gap-4 px-6">
          <div className="skeleton w-80 h-80 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-4 w-60"></div>
            <div className="flex flex-row gap-1">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-20"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <img
            src={data?.avatar_url}
            alt={data?.login}
            className="w-64 h-64 rounded-full"
          />
          <div className="flex flex-col gap-1 px-6 justify-center">
            <p className="text-xl font-semibold">{name}</p>
            <p className="text-sm">{bio}</p>
            <p className="text-md">{location}</p>
            <div className="flex flex-row gap-1">
              {!!followers && <p className="text-sm">{followers} followers</p>}
              {!!following && <p className="text-sm">{following} following</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
