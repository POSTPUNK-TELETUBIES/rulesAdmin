import { QualityProfileFilter } from './components/Filters/qualityprofiles.filter';
import { LanguageFilter } from './components/Filters/languages.filter';
import { TypesFilter } from './components/Filters/types.filter';
import { SeverityProfileFilter } from './components/Filters/severities.filter';
import { ActivateFilter } from './components/Filters/activate.filter';
import { RulesTable } from './components/RulesTable';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { Sync } from '@mui/icons-material';
import syncroIndexedDb from './lib/service/dexie';
import { useCallback, useState } from 'react';
import { fetchClient } from './lib/modules/fetchClient';

const ActionButtons = ()=>{
  const [isProcessing, setIsProcessing] = useState(false)
  const _handleClick = useCallback(async ()=>{
    setIsProcessing(true)
    const changes = await syncroIndexedDb.rulesStatus.toArray()
    await fetchClient.postNewStatus(changes)
    await syncroIndexedDb.rulesStatus.clear()
    setIsProcessing(false)
  },[])

  if(isProcessing)
    return (
      <Box 
        width='100%'
        display='flex'
        justifyContent='center'
        padding={2}
      >
        <CircularProgress sx={{margin: 'auto'}} color='info' />
      </Box>
    )

  return (
    <Button startIcon={<Sync />} variant='contained' onClick={_handleClick}>
      Syncronizar
    </Button>
  )
}

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
      <Stack>
        <ActionButtons />
      </Stack>
    </>
  )
}

export default App
