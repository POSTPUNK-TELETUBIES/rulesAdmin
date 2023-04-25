import { memo } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
} from "@mui/material";
import { ColorPalletes } from "../../theme";

interface GenericTablePros {
  header: JSX.Element;
  body: JSX.Element;
  footer?: JSX.Element;
}

const genericMemoizedTable = memo(function GenericTable({
  body,
  header,
  footer,
}: GenericTablePros) {
  return (
    <TableContainer sx={{ paddingY: 3 }}>
      <Table>
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
        {footer && <TableFooter>{footer}</TableFooter>}
      </Table>
    </TableContainer>
  );
});

export default genericMemoizedTable;
