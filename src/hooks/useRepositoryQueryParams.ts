import { useParams, useSearchParams } from 'react-router-dom';
import {
  IOrganizationsRepoParams,
  SortOptions,
  TypeOptions,
} from '../interfaces';
import { getValueFromEnum } from '../utils';
import { APIDefaults } from '../constants';

export const useRepositoryQueryParams = () => {
  const [searchParams] = useSearchParams();
  const { org } = useParams();
  if (!org) return null;
  const queryParams: IOrganizationsRepoParams = {
    org,
    search: searchParams.get('search') || '',
    type: getValueFromEnum(TypeOptions, searchParams.get('type') || ''),
    sort: getValueFromEnum(SortOptions, searchParams.get('sort') || ''),
    page: parseInt(
      searchParams.get('page') ??
        APIDefaults.searchRepoWithinOrg.page.toString(),
      10
    ),
    per_page: parseInt(
      searchParams.get('per_page') ||
        APIDefaults.searchRepoWithinOrg.per_page.toString(),
      10
    ),
  };

  return queryParams;
};
