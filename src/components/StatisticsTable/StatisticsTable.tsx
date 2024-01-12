import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import {
  PullRequestData,
  filterUniqueUsers,
  formatPullRequests
} from '../../utils';
import { PullRequest } from '../../redux/github/types';
import { labelTypes } from '../../utils/constants';

export default function StatisticsTable(): React.ReactElement {
  const {
    pullRequests,
    assignees,
    selectedBranch,
    selectedAssignee,
    selectedFromDate,
    selectedToDate,
    selectedLabel,
    issuesCommented
  } = useAppSelector((state) => state.gitHub);
  const [filteredData, setFilteredData] = useState<PullRequestData[]>([]);

  useEffect(() => {
    let filteredPullRequests = [...pullRequests];
    if (selectedAssignee) {
      filteredPullRequests = pullRequests.filter((pullRequest: PullRequest) => {
        return pullRequest.user.login === selectedAssignee;
      });
    }
    if (selectedBranch) {
      filteredPullRequests = pullRequests.filter((pullRequest: PullRequest) => {
        return pullRequest.base.ref === selectedBranch;
      });
    }
    if (selectedFromDate && selectedToDate) {
      const fromDate = new Date(selectedFromDate).getTime();
      const toDate = new Date(selectedToDate).getTime();
      filteredPullRequests = pullRequests.filter((pullRequest: PullRequest) => {
        const pullRequestDate = new Date(pullRequest.created_at).getTime();
        return pullRequestDate >= fromDate && pullRequestDate <= toDate;
      });
    }
    if (selectedLabel) {
      filteredPullRequests = pullRequests.filter((pullRequest: PullRequest) => {
        return pullRequest.labels.some((label) => label.name === selectedLabel);
      });
    }
    if (issuesCommented) {
      filteredPullRequests = pullRequests.filter((pullRequest: PullRequest) => {
        return pullRequest.labels.some(
          (label) => label.name === labelTypes.ISSUES_COMMENTED
        );
      });
    }
    const uniqueAssignees = filterUniqueUsers(filteredPullRequests);
    const filteredAssignees = selectedAssignee
      ? [selectedAssignee]
      : uniqueAssignees;
    setFilteredData(
      formatPullRequests(filteredPullRequests, filteredAssignees)
    );
  }, [
    assignees,
    pullRequests,
    selectedAssignee,
    selectedBranch,
    selectedFromDate,
    selectedLabel,
    selectedToDate,
    issuesCommented
  ]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#000' }}>
          <TableRow>
            <TableCell sx={{ color: '#fff' }}>Assignee</TableCell>
            <TableCell sx={{ color: '#fff' }} colSpan={3}>
              Features
            </TableCell>
            <TableCell sx={{ color: '#fff' }} colSpan={3}>
              Bugs
            </TableCell>
            <TableCell sx={{ color: '#fff' }} colSpan={3}>
              Others
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ backgroundColor: '#ebebeb' }}>
            <TableCell></TableCell>
            <TableCell>Open</TableCell>
            <TableCell>Merged</TableCell>
            <TableCell>Closed</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>Merged</TableCell>
            <TableCell>Closed</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>Merged</TableCell>
            <TableCell>Closed</TableCell>
          </TableRow>
          {filteredData.map((pullRequest: PullRequestData, index: number) => (
            <TableRow
              key={pullRequest.assignee + index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: index % 2 === 0 ? '#e1e0da' : '#ebebeb'
              }}
            >
              <TableCell component="th" scope="pullRequest">
                {pullRequest.assignee}
              </TableCell>
              <TableCell>{pullRequest.featureOpenCount}</TableCell>
              <TableCell>{pullRequest.featureMergedCount}</TableCell>
              <TableCell>{pullRequest.featureClosedCount}</TableCell>
              <TableCell>{pullRequest.bugOpenCount}</TableCell>
              <TableCell>{pullRequest.bugMergedCount}</TableCell>
              <TableCell>{pullRequest.bugClosedCount}</TableCell>
              <TableCell>{pullRequest.otherOpenCount}</TableCell>
              <TableCell>{pullRequest.otherMergedCount}</TableCell>
              <TableCell>{pullRequest.otherClosedCount}</TableCell>
            </TableRow>
          ))}
          {filteredData.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} sx={{ textAlign: 'center' }}>
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
