import {
  AllTeamRepositoriesResponse,
  AllTeamsResponse
} from '../redux/github/types';
import { axiosInstance } from './axiosService';

const organization = process.env.REACT_APP_GITHUB_ORGANIZATION;

export const getAllTeams = async (): Promise<AllTeamsResponse> => {
  return (await axiosInstance.get(`/orgs/${organization}/teams`)).data;
};

export const getAllTeamRepositories = async (
  slug: string
): Promise<AllTeamRepositoriesResponse> => {
  return (await axiosInstance.get(`/orgs/${organization}/teams/${slug}/repos`))
    .data;
};

export const getRepositoryBranches = async (
  repository: string
): Promise<AllTeamRepositoriesResponse> => {
  return (
    await axiosInstance.get(`/repos/${organization}/${repository}/branches`)
  ).data;
};

export const getAllTeamMembers = async (
  slug: string
): Promise<AllTeamRepositoriesResponse> => {
  return (
    await axiosInstance.get(`/orgs/${organization}/teams/${slug}/members`)
  ).data;
};

export const getAllPrs = async (
  repository: string,
  page: number
): Promise<AllTeamRepositoriesResponse> => {
  return (
    await axiosInstance.get(
      `/repos/fcodelabs/${repository}/pulls?state=all&per_page=100&page=${page}`
    )
  ).data;
};
