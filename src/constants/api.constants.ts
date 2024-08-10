export const APIRoutes = {
  root: 'https://api.github.com/',
  searchOrganizations: () => `search/users`,
  searchRepoWithinOrg: () => `search/repositories`,
  getRepositoriesByOrg: (org: string) => `orgs/${org}/repos`,
  getRepositoryDetails: (owner: string, repo: string) =>
    `repos/${owner}/${repo}`,
  getUserDetails: (owner: string) => `users/${owner}`,
  // getAllL: (owner: string) => `users/${owner}`,
};

export const APIDefaults = {
  searchRepoWithinOrg: {
    page: 1,
    per_page: 5,
    sort: '',
  },
};
