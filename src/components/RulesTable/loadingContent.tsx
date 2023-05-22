import { Box, CircularProgress, TableCell } from '@mui/material';

interface LoadingContentTableProps {
  colSpan: number;
}

export const LoadingContentTable = ({ colSpan }: LoadingContentTableProps) => (
  <TableCell colSpan={colSpan}>
    <Box display='grid' sx={{ placeContent: 'center', minHeight: 400 }}>
      <CircularProgress />
    </Box>
  </TableCell>
);
