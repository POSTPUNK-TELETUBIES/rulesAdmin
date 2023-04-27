import { TableCell, TableRow, Typography, Stack } from "@mui/material";
import { ColumnConfig } from "../RulesTable/config";
import { memo } from "react";

interface GenericHeaderProps {
  data: ColumnConfig[];
}

export const GenericHeader = memo(({ data }: GenericHeaderProps) => {
  return (
    <TableRow>
      {data.map(({ label, icon, className, filter }) => (
        <TableCell
          className={className}
          sx={{
            background: (theme) => `${theme.palette.grey[900]} !important`,
          }}
          key={label}
        >
          <Stack direction="row" gap={1} alignItems="center">
            {filter}
            {icon}
            <Typography sx={{ color: (theme) => theme.palette.common.white }}>
              {label}
            </Typography>
          </Stack>
        </TableCell>
      ))}
    </TableRow>
  );
});
