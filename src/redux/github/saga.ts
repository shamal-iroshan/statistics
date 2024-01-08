import { Effect, ForkEffect, call, put, takeLatest } from 'redux-saga/effects';
import { gitHubActions } from './slice';
import {
  getAllPrs,
  getAllTeamMembers,
  getAllTeamRepositories,
  getAllTeams,
  getRepositoryBranches
} from '../../utils/apiService';
import {
  AllBranchesResponse,
  AllPrsResponse,
  AllTeamMembersResponse,
  AllTeamRepositoriesResponse,
  AllTeamsResponse
} from './types';
import { PayloadAction } from '@reduxjs/toolkit';

export function* watchFetchTeamsSaga(): Generator<Effect, void> {
  try {
    const response = yield call(getAllTeams);
    yield put(gitHubActions.fetchTeamsSuccess(response as AllTeamsResponse));
  } catch (error) {
    console.error(error);
    yield put(gitHubActions.setLoading(false));
  }
}

export function* watchSelectTeamSaga({
  payload
}: PayloadAction<string>): Generator<Effect, void> {
  try {
    const response = yield call(getAllTeamRepositories, payload);
    yield put(
      gitHubActions.fetchTeamRepositoriesSuccess(
        response as AllTeamRepositoriesResponse
      )
    );
    const members = yield call(getAllTeamMembers, payload);
    yield put(
      gitHubActions.fetchTeamMembersSuccess(members as AllTeamMembersResponse)
    );
  } catch (error) {
    console.error(error);
    yield put(gitHubActions.setLoading(false));
  }
}

export function* watchSelectRepositorySaga({
  payload
}: PayloadAction<string>): Generator<Effect, void> {
  try {
    // fetch branches
    const response = yield call(getRepositoryBranches, payload);
    yield put(
      gitHubActions.fetchBranchesSuccess(response as AllBranchesResponse)
    );

    //fetch PRs
    let page = 1;
    let responseLength = 0;
    const prResponse = yield call(getAllPrs, payload, page);
    const pullRequests = prResponse as AllPrsResponse;
    responseLength = pullRequests.length;
    while (responseLength === 100) {
      page++;
      const nextPrResponse = yield call(getAllPrs, payload, page);
      const nextPrs = nextPrResponse as AllPrsResponse;
      pullRequests.push(...(nextPrResponse as AllPrsResponse));
      responseLength = nextPrs.length;
    }
    yield put(gitHubActions.fetchPullRequestsSuccess(pullRequests));
    yield put(gitHubActions.setLoading(false));
  } catch (error) {
    console.error(error);
    yield put(gitHubActions.setLoading(false));
  }
}

export function* watchgithubSagas(): Generator<ForkEffect, void> {
  yield takeLatest(gitHubActions.fetchTeams, watchFetchTeamsSaga);
  yield takeLatest(gitHubActions.selectTeam, watchSelectTeamSaga);
  yield takeLatest(gitHubActions.selectRepository, watchSelectRepositorySaga);
}

const githubSagas = watchgithubSagas;
export default githubSagas;
