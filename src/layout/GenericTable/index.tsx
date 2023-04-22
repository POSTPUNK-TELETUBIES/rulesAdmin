import { memo } from "react";
import { TableContainer, Table, TableHead, TableBody, TableFooter } from '@mui/material'

interface GenericTablePros{
  header:JSX.Element;
  body:JSX.Element;
  footer?: JSX.Element;
}

const genericMemoizedTable = memo(
  function GenericTable({body, header, footer}: GenericTablePros){
    return (
      <TableContainer>
        <Table>
          <TableHead>
            {header}
          </TableHead>
          <TableBody>
            {body}
          </TableBody>
          {footer && <TableFooter>
            {footer}
          </TableFooter>
          }
        </Table>
      </TableContainer>
    )
})

export default genericMemoizedTable
