import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AllBranchesResponse,
  AllPrsResponse,
  AllTeamMembersResponse,
  AllTeamRepositoriesResponse,
  AllTeamsResponse
} from './types';
import { filterUniqueLabels, filterUniqueUsers } from '../../utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IGitHubState {
  teams: AllTeamsResponse;
  fetchTeamsError: string;
  loading: boolean;
  teamRepositories: AllTeamRepositoriesResponse;
  fetchTeamRepositoriesError: string;
  branches: AllBranchesResponse;
  fetchbranchesError: string;
  teamMembers: AllTeamMembersResponse;
  fetchTeamMembersError: string;
  selectedTeam?: string;
  selectedRepository?: string;
  selectedBranch?: string;
  pullRequests: AllPrsResponse;
  assignees: string[];
  labels: string[];
  selectedAssignee?: string;
  selectedLabel?: string;
  selectedFromDate?: string;
  selectedToDate?: string;
  issuesCommented: boolean;
}

const initialState: IGitHubState = {
  teams: [],
  fetchTeamsError: '',
  loading: false,
  selectedTeam: undefined,
  teamRepositories: [],
  fetchTeamRepositoriesError: '',
  branches: [],
  fetchbranchesError: '',
  teamMembers: [],
  fetchTeamMembersError: '',
  selectedRepository: undefined,
  selectedBranch: undefined,
  pullRequests: [],
  assignees: [],
  labels: [],
  selectedAssignee: undefined,
  issuesCommented: false
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    fetchTeams: (state: any) => {
      state.loading = true;
    },
    fetchTeamsSuccess: (
      state: any,
      action: PayloadAction<AllTeamsResponse>
    ) => {
      state.teams = action.payload;
      state.loading = false;
    },
    fetchTeamsError: (state: any, action: PayloadAction<string>) => {
      state.fetchTeamsError = action.payload;
      state.loading = false;
    },
    selectTeam: (state: any, action: PayloadAction<string>) => {
      state.selectedTeam = action.payload;
      state.loading = true;
    },
    fetchTeamRepositories: (state: any) => {
      state.loading = true;
    },
    fetchTeamRepositoriesSuccess: (
      state: any,
      action: PayloadAction<AllTeamRepositoriesResponse>
    ) => {
      state.teamRepositories = action.payload;
      state.loading = false;
    },
    fetchTeamRepositoriesError: (state: any, action: PayloadAction<string>) => {
      state.fetchTeamRepositoriesError = action.payload;
      state.loading = false;
    },
    selectRepository: (state: any, action: PayloadAction<string>) => {
      state.selectedRepository = action.payload;
      state.loading = true;
    },
    fetchBranches: (state: any) => {
      state.loading = true;
    },
    fetchBranchesSuccess: (
      state: any,
      action: PayloadAction<AllBranchesResponse>
    ) => {
      state.branches = action.payload;
    },
    fetchBranchesError: (state: any, action: PayloadAction<string>) => {
      state.fetchbranchesError = action.payload;
      state.loading = false;
    },
    selectBranch: (state: any, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.selectedBranch = undefined;
      } else {
        state.selectedBranch = action.payload;
      }
    },
    fetchTeamMembers: (state: any) => {
      state.loading = true;
    },
    fetchTeamMembersSuccess: (
      state: any,
      action: PayloadAction<AllTeamMembersResponse>
    ) => {
      state.teamMembers = action.payload;
      state.loading = false;
    },
    fetchTeamMembersError: (state: any, action: PayloadAction<string>) => {
      state.fetchTeamMembersError = action.payload;
      state.loading = false;
    },
    fetchPullRequests: (
      state: any,
      _action: PayloadAction<{
        selectedAssignee: string;
        selectedRepository: string;
      }>
    ) => {
      state.loading = true;
    },
    fetchPullRequestsSuccess: (
      state: any,
      action: PayloadAction<AllPrsResponse>
    ) => {
      state.pullRequests = action.payload;
      state.assignees = filterUniqueUsers(action.payload);
      state.labels = filterUniqueLabels(action.payload);
    },
    fetchPullRequestsError: (state: any, action: PayloadAction<string>) => {
      state.fetchTeamMembersError = action.payload;
      state.loading = false;
    },
    selectAssignee: (state: any, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.selectedAssignee = undefined;
      } else {
        state.selectedAssignee = action.payload;
      }
    },
    setLoading: (state: any, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    selectLabel: (state: any, action: PayloadAction<string>) => {
      state.selectedLabel = action.payload;
    },
    selectFromDate: (state: any, action: PayloadAction<string>) => {
      state.selectedFromDate = action.payload;
    },
    selectToDate: (state: any, action: PayloadAction<string>) => {
      state.selectedToDate = action.payload;
    },
    setIssuesCommented: (state: any, action: PayloadAction<boolean>) => {
      state.issuesCommented = action.payload;
    }
  }
});

export const { actions: gitHubActions } = githubSlice;
const githubReducer = githubSlice.reducer;
export default githubReducer;
