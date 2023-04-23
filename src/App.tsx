import { QualityProfileFilter } from './components/Filters/qualityprofiles.filter';
import { LanguageFilter } from './components/Filters/languages.filter';
import { TypesFilter } from './components/Filters/types.filter';
import { SeverityProfileFilter } from './components/Filters/severities.filter';
import { ActivateFilter } from './components/Filters/activate.filter';
import { RulesTable } from './components/RulesTable';
import { Box, Stack } from '@mui/material';

function App() {

  return (
    <>
    <Stack direction='column' gap={4}>
      <Box display={'flex'} gap={4}>
        <LanguageFilter />
        <QualityProfileFilter />  
      </Box>
      <Box display={'flex'} gap={4}>
        <TypesFilter />
        <SeverityProfileFilter />
        <ActivateFilter />
      </Box>
    </Stack>
      
     

      <RulesTable />
    </>
  )
}

export default App
