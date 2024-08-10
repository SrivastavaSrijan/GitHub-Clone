import axios from "axios";
import {
  IOrganizationsRepoData,
  IOrganizationsRepoParams,
  IRepositoryDetail,
  ISearchResults,
  IUserData,
} from "../interfaces";
import { APIRoutes } from "../constants";

const envSource = import.meta.env || process.env;
const VITE_GIT_TOKEN = envSource.VITE_GIT_TOKEN;
const instance = axios.create({
  baseURL: APIRoutes.root,
  headers: {
    ...(VITE_GIT_TOKEN && { Authorization: `Bearer ${VITE_GIT_TOKEN}` }),
  },
});

const getSWRParam = (value: string) => value.split(":")[1];
export const setSWRParam = (prefix: string, suffix?: string) =>
  prefix + ":" + suffix;

// Search repositories by organization
export const searchOrganizations = async (swrQuery: string) => {
  const query = getSWRParam(swrQuery);
  if (!query) return;
  try {
    const response = await instance.get<ISearchResults>(
      APIRoutes.searchOrganizations(),
      {
        params: {
          q: `type:org ${query}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching organizations:", error);
    return null;
  }
};

const formatGitHubQueryParams = ({
  search,
  type,
  org,
}: IOrganizationsRepoParams) => {
  const parts = [`in:name org:${org}`];
  if (search) parts.push(search);
  if (type) parts.push(`type:${type}`);

  return parts.join(" ").trim();
};
// Search repositories within an organization based on keywords
export const searchRepositoriesInOrg = async (
  params: IOrganizationsRepoParams
) => {
  const query = formatGitHubQueryParams({ ...params });
  const { page, per_page, sort } = params;
  try {
    const response = await instance.get<IOrganizationsRepoData>(
      APIRoutes.searchRepoWithinOrg(),
      {
        params: {
          q: query,
          page,
          per_page,
          sort,
          order: sort === "name" ? "asc" : "desc",
        },
      }
    );
    return response.data; // Assuming the response.data directly contains the array of repositories
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    return null;
  }
};

// Get single repositories by organization
export const getRepositoriesByOrg = async (
  org: string,
  query: IOrganizationsRepoParams
) => {
  try {
    const response = await instance.get<IOrganizationsRepoData>(
      APIRoutes.getRepositoriesByOrg(org),
      {
        params: { ...query },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting repositories:", error);
    return null;
  }
};

// Get single repository details
export const getRepositoryDetails = async (owner: string, repo: string) => {
  try {
    const response = await instance.get<IRepositoryDetail>(
      `repos/${owner}/${repo}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching repository details:", error);
    return null;
  }
};

// Get single user details
export const getUserDetails = async (org: string) => {
  try {
    const response = await instance.get<IUserData>(
      APIRoutes.getUserDetails(getSWRParam(org))
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
