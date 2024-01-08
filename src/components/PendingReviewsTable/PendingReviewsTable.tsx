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
import { PendingPullRequestData, formatPendingPullRequests } from '../../utils';

export default function PendingReviewsTable(): React.ReactElement {
  const { pullRequests, assignees } = useAppSelector((state) => state.gitHub);
  const [filteredData, setFilteredData] = useState<PendingPullRequestData[]>(
    []
  );

  useEffect(() => {
    setFilteredData(formatPendingPullRequests(pullRequests, assignees));
  }, [assignees, pullRequests]);

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
