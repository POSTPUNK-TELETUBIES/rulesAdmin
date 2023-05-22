import { TableCell, TableRow } from '@mui/material';
import { Info } from '../../layout/Info';
import { FolderOff } from '@mui/icons-material';
import { PropsWithChildren } from 'react';

interface NoDataContentProps {
  colSpan: number;
  hasContent: boolean;
}

export const NoDataContent = ({
  hasContent,
  children,
  colSpan,
}: PropsWithChildren<NoDataContentProps>) => {
  if (hasContent) return <>{children}</>;

  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Info
          icon={<FolderOff color='disabled' fontSize='inherit' />}
          primaryText='Sin datos'
          secondaryText='Selecciona filtros'
        />
      </TableCell>
    </TableRow>
  );
};
