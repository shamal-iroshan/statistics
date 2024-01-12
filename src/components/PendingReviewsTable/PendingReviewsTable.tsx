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
  PendingPullRequestData,
  filterUniqueUsers,
  formatPendingPullRequests
} from '../../utils';
import { PullRequest } from '../../redux/github/types';

export default function PendingReviewsTable(): React.ReactElement {
  const {
    pullRequests,
    assignees,
    selectedBranch,
    selectedAssignee,
    selectedFromDate,
    selectedToDate,
    selectedLabel
  } = useAppSelector((state) => state.gitHub);
  const [filteredData, setFilteredData] = useState<PendingPullRequestData[]>(
    []
  );

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
    const uniqueAssignees = filterUniqueUsers(filteredPullRequests);
    const filteredAssignees = selectedAssignee
      ? [selectedAssignee]
      : uniqueAssignees;
    setFilteredData(formatPendingPullRequests(pullRequests, filteredAssignees));
  }, [
    assignees,
    pullRequests,
    selectedAssignee,
    selectedBranch,
    selectedFromDate,
    selectedLabel,
    selectedToDate
  ]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#000' }}>
          <TableRow>
            <TableCell sx={{ color: '#fff' }}>Assignee</TableCell>
            <TableCell sx={{ color: '#fff' }}>Features</TableCell>
            <TableCell sx={{ color: '#fff' }}>Bugs</TableCell>
            <TableCell sx={{ color: '#fff' }}>Others</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map(
            (pullRequest: PendingPullRequestData, index: number) => (
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
                <TableCell>{pullRequest.featureCount}</TableCell>
                <TableCell>{pullRequest.bugCount}</TableCell>
                <TableCell>{pullRequest.otherCount}</TableCell>
              </TableRow>
            )
          )}
          {filteredData.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
