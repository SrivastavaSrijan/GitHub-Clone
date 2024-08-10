import { RepositoryList, OrganizationDetail } from '../components';

export const RepositoryListPage: React.FC = () => {
  return (
    <div className="container max-w-screen-lg mx-auto md:py-12 px-4 py-4">
      <div className="lg:grid lg:grid-cols-3 flex-col flex md:gap-12 gap-10 justify-start items-start">
        <OrganizationDetail />
        <RepositoryList />
      </div>
    </div>
  );
};
