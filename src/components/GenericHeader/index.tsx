import { TableCell, TableRow, Typography, Stack, Box } from '@mui/material';
import { ColumnConfig } from '../RulesTable/config';
import { memo } from 'react';

interface GenericHeaderProps {
  data: ColumnConfig[];
}

export const GenericHeader = memo(({ data }: GenericHeaderProps) => {
  return (
    <>
      <TableRow>
        {data.map(({ label, icon, className }) => (
          <TableCell
            variant='head'
            className={className}
            sx={{
              paddingTop: 1,
              paddingBottom: 0,
              background: (theme) => `${theme.palette.grey[900]} !important`,
            }}
            key={label}
          >
            <Stack
              direction='row'
              gap={0.5}
              alignItems='center'
              justifyContent='center'
            >
              {icon}
              <Typography
                sx={{ color: (theme) => theme.palette.common.white }}
                fontWeight={700}
              >
                {label}
              </Typography>
            </Stack>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        {data.map(({ filter, label }, index) => (
          <TableCell
            variant='head'
            sx={{
              paddingTop: 0,
              paddingBottom: 1,
              background: (theme) => `${theme.palette.grey[900]} !important`,
            }}
            key={label + index}
          >
            <Box display='grid' sx={{ placeContent: 'center' }}>
              {filter}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </>
  );
});
