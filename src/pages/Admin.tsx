import { Info, QuestionAnswer } from '@mui/icons-material';
import { Box, Container, Stack, Typography } from '@mui/material';
import { LanguageFilter } from '../components/Filters/languages.filter';
import { QualityProfileFilter } from '../components/Filters/qualityprofiles.filter';
import { RulesTable } from '../components/RulesTable';
import { Sticky } from '../layout/Sticky';
import { DraggableMenu } from '../components/DraggableMenu';
import { Search } from '../components/Search';

export default function Admin() {
  return (
    <Container>
      <Box display={'flex'} flexDirection={'column'} gap={2} pt={6} pb={2}>
        <Box display={'flex'} gap={1.5}>
          <QuestionAnswer />
          <Typography fontSize={{ xs: '16px', md: '17px' }}>
            Activa o desactiva los switches dependiendo si deseas habilitar la
            regla o no
          </Typography>
        </Box>
        <Box display={'flex'} gap={1.5}>
          <Info />
          <Typography fontSize={{ xs: '16px', md: '17px' }}>
            Recuerda que los estados que propongas no se aplicarán de inmediato
            en SonarQube
          </Typography>
        </Box>
      </Box>
      {/* SELECTORES */}
      <Stack direction='column' gap={4} marginTop={4}>
        <Box display='flex' gap={4}>
          <LanguageFilter />
          <QualityProfileFilter />
          <Search />
        </Box>
      </Stack>
      {/* TABLA */}
      <RulesTable />
      <Sticky content={<DraggableMenu />} />
    </Container>
  );
}
