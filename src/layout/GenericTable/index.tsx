import { memo } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  Paper,
} from '@mui/material';
import { ColorPalletes } from '../../theme';

interface GenericTablePros {
  header: JSX.Element;
  body: JSX.Element;
  footer?: JSX.Element;
  stickyHeader?: boolean;
  isEmpty?: boolean;
}

const genericMemoizedTable = memo(function GenericTable({
  body,
  header,
  footer,
  stickyHeader = true,
}: GenericTablePros) {
  return (
    <Paper sx={{ my: 4, background: 'transparent' }}>
      <TableContainer sx={{ maxHeight: '80vh' }}>
        <Table stickyHeader={stickyHeader}>
          <TableHead>{header}</TableHead>
          <TableBody
            sx={{
              backgroundColor: ({ palette }) =>
                palette.mode === ColorPalletes.DARK
                  ? palette.grey[800]
                  : palette.grey[300],
            }}
          >
            {body}
          </TableBody>
          {footer && body && <TableFooter>{footer}</TableFooter>}
        </Table>
      </TableContainer>
      {!body && <div>asdsadsadsda</div>}
    </Paper>
  );
});

export default genericMemoizedTable;
