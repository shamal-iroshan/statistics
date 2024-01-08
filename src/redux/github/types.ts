export type Team = {
  id: 1;
  node_id: string;
  url: string;
  html_url: string;
  name: string;
  slug: string;
  description: string;
  privacy: string;
  notification_setting: string;
  permission: string;
  members_url: string;
  repositories_url: string;
  parent: null | string;
};

export type Owner = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export type Repository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: Owner;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string;
  hooks_url: string;
  svn_url: string;
  homepage: string;
  language: null | string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template: boolean;
  topics: string[];
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  has_discussions: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: string;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  permissions: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
  security_and_analysis: {
    advanced_security: {
      status: string;
    };
    secret_scanning: {
      status: string;
    };
    secret_scanning_push_protection: {
      status: string;
    };
  };
};

export type Branch = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
  protection: {
    required_status_checks: {
      enforcement_level: string;
      contexts: string[];
    };
  };
  protection_url: string;
};

export type TeamMember = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export type Label = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
};

export type PullRequest = {
  url: string;
  id: number;
  state: string;
  locked: boolean;
  title: string;
  user: Owner;
  body: string;
  labels: Label[];
  number: number;
  html_url: string;
  base: {
    ref: string;
  };
  milestone: {
    url: string;
    html_url: string;
    id: number;
    state: string;
    title: string;
    description: string;
    creator: Owner;
    open_issues: number;
    closed_issues: number;
  };
  active_lock_reason: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  merged_at: string;
  merge_commit_sha: string;
  assignee: Owner;
  assignees: Owner[];
  requested_reviewers: Owner[];
  repo: {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: Owner;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
  };
};

export type AllTeamsResponse = Team[];

export type AllTeamRepositoriesResponse = Repository[];

export type AllBranchesResponse = Branch[];

export type AllTeamMembersResponse = TeamMember[];

export type AllPrsResponse = PullRequest[];
