import { Info, QuestionAnswer } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { LanguageFilter } from '../components/Filters/languages.filter';
import { QualityProfileFilter } from '../components/Filters/qualityprofiles.filter';
import { RulesTable } from '../components/RulesTable';
import { Sticky } from '../layout/Sticky';
import { DraggableMenu } from '../components/DraggableMenu';
import { Search } from '../components/Search';

export default function AdminPanel() {
  return (
    <>
      <Stack gap={3} marginBottom={6}>
        <Typography style={{ display: 'flex', gap: '1rem' }}>
          <QuestionAnswer /> Activa o desactiva los switches dependiendo si
          deseas habilitar la regla o no
        </Typography>
        <Typography style={{ display: 'flex', gap: '1rem' }}>
          <Info /> Recuerda que los estados que propongas no se aplicarán de
          inmediato en SonarQube
        </Typography>
      </Stack>
      <Stack direction='column' gap={4} marginTop={4}>
        <Box display='flex' gap={4}>
          <LanguageFilter />
          <QualityProfileFilter />
          <Search />
        </Box>
      </Stack>
      <RulesTable />
      <Sticky content={<DraggableMenu />} />
    </>
  );
}
