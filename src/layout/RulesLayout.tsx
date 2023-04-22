import Grid from '@mui/material/Grid';

import RulesOptions from '../components/RulesList/RulesOptions';
import { FiltersButtons } from '../components/RulesList/FiltersButtons';
import { RulesList } from '../components/RulesList/RulesList';
import { RulesPagination } from '../components/RulesList/RulesPagination';

export default function RulesLayout() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FiltersButtons />
      </Grid>
      <Grid item xs={12}>
        <RulesList />
      </Grid>
      <Grid item xs={12}>
        <RulesPagination />
      </Grid>
      <Grid item xs={12}>
        <RulesOptions />
      </Grid>
    </Grid>
  );
}
