import { Collapse, TableCell, TableRow } from '@mui/material';
import { PropsWithChildren, useContext, useState } from 'react';
import { SwitchContext } from '../Switch/switchContext';

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
  const { isDisabled } = useContext(SwitchContext);

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    if (!isDisabled && event.target instanceof HTMLInputElement) {
      setIsOpen((prev) => !prev);
    }
  };
  return (
    <>
      <TableRow
        sx={{
          cursor: isDisabled ? 'default' : 'pointer',
          ':hover': {
            backgroundColor: ({ palette }) =>
              isDisabled ? 'inherit' : palette.grey[400],
          },
        }}
        onClick={handleClick}
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
