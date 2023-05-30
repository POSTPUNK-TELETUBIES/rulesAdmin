import { Collapse, TableCell, TableRow } from '@mui/material';
import { PropsWithChildren, useState } from 'react';

interface WithCollapsibleProps {
  collapseContent: JSX.Element;
  colSpan?: number;
}

export const WithCollapsible = ({
  children,
  collapseContent,
  colSpan,
}: PropsWithChildren<WithCollapsibleProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow
        sx={{
          cursor: 'pointer',
          ':hover': {
            backgroundColor: ({ palette }) => palette.grey[400],
          },
        }}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {children}
      </TableRow>
      <TableRow>
        <TableCell padding={isOpen ? 'normal' : 'none'} colSpan={2} />
        <TableCell colSpan={colSpan} padding={isOpen ? 'normal' : 'none'}>
          <Collapse in={isOpen}>{collapseContent}</Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
