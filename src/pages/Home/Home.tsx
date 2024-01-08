import React, { useEffect, useMemo } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import DropDown from '../../components/DropDown/DropDown';
import DatePicker from '../../components/DatePicker/DatePicker';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { gitHubActions } from '../../redux/github/slice';
import { Branch, Repository, Team } from '../../redux/github/types';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import Loader from '../../components/Loader/Loader';
import PendingReviewsTable from '../../components/PendingReviewsTable/PendingReviewsTable';

export default function Home(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { teams, teamRepositories, branches, loading, assignees, labels } =
    useAppSelector((state) => state.gitHub);

  useEffect(() => {
    dispatch(gitHubActions.fetchTeams());
  }, [dispatch]);

  const teamSelect = useMemo(() => {
    return teams.map((team: Team) => {
      return { label: team.name, value: team.slug };
    });
  }, [teams]);

  const teamRepositorySelect = useMemo(() => {
    return teamRepositories.map((repo: Repository) => {
      return { label: repo.name, value: repo.id };
    });
  }, [teamRepositories]);

  const branchesSelect = useMemo(() => {
    return branches.map((branch: Branch) => {
      return { label: branch.name, value: branch.name };
    });
  }, [branches]);

  const assigneesSelect = useMemo(() => {
    return assignees.map((assignee: string) => {
      return { label: assignee, value: assignee };
    });
  }, [assignees]);

  const labelsSelect = useMemo(() => {
    return labels.map((label: string) => {
      return { label: label, value: label };
    });
  }, [labels]);

  return (
    <>
      {loading && <Loader />}
      <PageWrapper>
        <>
          <Grid display="flex" gap="20px">
            <DropDown
              onChange={(data) => {
                dispatch(gitHubActions.selectTeam(data.value));
              }}
              label="Teams"
              options={teamSelect}
            />
            <DropDown
              onChange={(data) => {
                dispatch(gitHubActions.selectRepository(data.label));
              }}
              label="Repository"
              options={teamRepositorySelect}
              disabled={teamRepositories.length === 0}
            />
            <DropDown
              onChange={(data) => {
                if (data && data.value) {
                  dispatch(gitHubActions.selectBranch(data.value));
                } else {
                  dispatch(gitHubActions.selectBranch(''));
                }
              }}
              label="Branch"
              options={branchesSelect}
              disabled={branches.length === 0}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={assignees.length === 0}
                  onChange={(e, checked) =>
                    dispatch(gitHubActions.setIssuesCommented(checked))
                  }
                />
              }
              label="Issues commented"
            />
          </Grid>
          <Grid display="flex" gap="20px" marginTop="20px">
            <DropDown
              onChange={(data) => {
                if (data && data.label) {
                  dispatch(gitHubActions.selectAssignee(data.label));
                } else {
                  dispatch(gitHubActions.selectAssignee(''));
                }
              }}
              label="Assignee"
              options={assigneesSelect}
              disabled={assignees.length === 0}
            />
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="20px"
            >
              <Typography variant="h5">Date</Typography>
              <Typography>From</Typography>
              <DatePicker
                id="from"
                name="from"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(gitHubActions.selectFromDate(e.target.value))
                }
              />
              <Typography>To</Typography>
              <DatePicker
                id="to"
                name="to"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(gitHubActions.selectToDate(e.target.value))
                }
              />
            </Grid>
            <DropDown
              label="labels"
              options={labelsSelect}
              disabled={labels.length === 0}
              onChange={(data) => {
                dispatch(gitHubActions.selectLabel(data.value));
              }}
            />
          </Grid>
          <Grid container spacing={2} marginTop="50px">
            <Grid item sm={12} md={8}>
              <Typography variant="h5" sx={{ textAlign: 'left' }}>
                Statistics
              </Typography>
              <StatisticsTable />
            </Grid>

            <Grid item sm={12} md={4}>
              <Typography variant="h5" sx={{ textAlign: 'left' }}>
                Pending Reviews
              </Typography>
              <PendingReviewsTable />
            </Grid>
          </Grid>
        </>
      </PageWrapper>
    </>
  );
}
