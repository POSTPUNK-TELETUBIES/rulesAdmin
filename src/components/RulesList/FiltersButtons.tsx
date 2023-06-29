import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';

export function FiltersButtons() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ width: '100%', marginBottom: '10px' }}>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' sx={{ width: '15%' }}>
            Lenguaje
          </Button>
          <FormControl sx={{ m: 1 }}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Age'
              defaultValue={'JavaScript'}
              autoWidth={true}
              sx={{ backgroundColor: '#C8EEE5', minWidth: '160px' }}
            >
              <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
              <MenuItem value={'Java'}>Java</MenuItem>
              <MenuItem value={'TypeScript'}>TypeScript</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Box sx={{ width: '100%', marginBottom: '10px' }}>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' sx={{ width: '15%' }}>
            Quality Profile
          </Button>
          <FormControl sx={{ m: 1 }}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Age'
              defaultValue={'DigitalFront-JS'}
              autoWidth={true}
              sx={{ backgroundColor: '#C8EEE5', minWidth: '160px' }}
            >
              <MenuItem value={'DigitalFront-JS'}>DigitalFront-JS</MenuItem>
              <MenuItem value={'DigitalBack-JS'}>DigitalBack-JS</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
}
