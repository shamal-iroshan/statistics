import { AllPrsResponse, PullRequest } from '../redux/github/types';
import { labelTypes } from './constants';

export interface PullRequestData {
  assignee: string;
  featureOpenCount: number;
  featureMergedCount: number;
  featureClosedCount: number;
  bugOpenCount: number;
  bugMergedCount: number;
  bugClosedCount: number;
  otherOpenCount: number;
  otherMergedCount: number;
  otherClosedCount: number;
}

export interface PendingPullRequestData {
  assignee: string;
  featureCount: number;
  bugCount: number;
  otherCount: number;
}

export const formatPullRequests = (
  pullRequests: PullRequest[],
  users: string[]
): PullRequestData[] => {
  const formatedData: PullRequestData[] = [];
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const dataObject: PullRequestData = {
      assignee: user,
      featureOpenCount: 0,
      featureMergedCount: 0,
      featureClosedCount: 0,
      bugOpenCount: 0,
      bugMergedCount: 0,
      bugClosedCount: 0,
      otherOpenCount: 0,
      otherMergedCount: 0,
      otherClosedCount: 0
    };
    pullRequests.map((pullRequest) => {
      if (pullRequest.user.login === user) {
        if (
          pullRequest.labels.find((label) => label.name === labelTypes.FEATURE)
        ) {
          if (pullRequest.state === 'open') {
            dataObject.featureOpenCount += 1;
          } else if (pullRequest.state === 'closed' && !pullRequest.merged_at) {
            dataObject.featureClosedCount += 1;
          } else if (pullRequest.state === 'closed' && pullRequest.merged_at) {
            dataObject.featureMergedCount += 1;
          }
        } else if (
          pullRequest.labels.find((label) => label.name === labelTypes.BUG)
        ) {
          if (pullRequest.state === 'open') {
            dataObject.bugOpenCount += 1;
          } else if (pullRequest.state === 'closed' && !pullRequest.merged_at) {
            dataObject.bugClosedCount += 1;
          } else if (pullRequest.state === 'closed' && pullRequest.merged_at) {
            dataObject.bugMergedCount += 1;
          }
        } else {
          if (pullRequest.state === 'open') {
            dataObject.otherOpenCount += 1;
          } else if (pullRequest.state === 'closed' && !pullRequest.merged_at) {
            dataObject.otherClosedCount += 1;
          } else if (pullRequest.state === 'closed' && pullRequest.merged_at) {
            dataObject.otherMergedCount += 1;
          }
        }
      }
    });
    formatedData.push(dataObject);
  }
  return formatedData;
};

export const formatPendingPullRequests = (
  pullRequests: PullRequest[],
  users: string[]
): PendingPullRequestData[] => {
  const formatedData: PendingPullRequestData[] = [];
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const dataObject: PendingPullRequestData = {
      assignee: user,
      featureCount: 0,
      bugCount: 0,
      otherCount: 0
    };
    pullRequests.map((pullRequest) => {
      if (pullRequest.user.login === user) {
        if (
          !pullRequest.labels.find(
            (label) => label.name === labelTypes.ISSUES_COMMENTED
          )
        ) {
          if (
            pullRequest.labels.find(
              (label) => label.name === labelTypes.FEATURE
            )
          ) {
            if (pullRequest.state === 'open') {
              dataObject.featureCount += 1;
            }
          } else if (
            pullRequest.labels.find((label) => label.name === labelTypes.BUG)
          ) {
            if (pullRequest.state === 'open') {
              dataObject.bugCount += 1;
            }
          } else {
            if (pullRequest.state === 'open') {
              dataObject.otherCount += 1;
            }
          }
        }
      }
    });
    if (
      dataObject.featureCount > 0 ||
      dataObject.bugCount > 0 ||
      dataObject.otherCount > 0
    ) {
      formatedData.push(dataObject);
    }
  }
  return formatedData;
};

export const filterUniqueUsers = (pullRequests: AllPrsResponse): string[] => {
  const users: string[] = [];
  pullRequests.map((pullRequest: PullRequest) => {
    if (!users.includes(pullRequest.user.login)) {
      users.push(pullRequest.user.login);
    }
  });
  return users;
};

export const filterUniqueLabels = (pullRequests: AllPrsResponse): string[] => {
  const labels: string[] = [];
  pullRequests.map((pullRequest: PullRequest) => {
    pullRequest.labels.map((label) => {
      if (!labels.includes(label.name)) {
        labels.push(label.name);
      }
    });
  });
  return labels;
};
