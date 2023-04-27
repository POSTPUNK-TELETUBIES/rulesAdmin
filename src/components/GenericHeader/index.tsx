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
          variant="head"
          className={className}
          sx={{
            background: (theme) => `${theme.palette.grey[900]} !important`,
          }}
          key={label}
        >
          <Stack
            direction="row"
            gap={0.5}
            alignItems="center"
            justifyContent="center"
          >
            {icon}
            <Typography
              sx={{ color: (theme) => theme.palette.common.white }}
              fontWeight={700}
            >
              {label}
            </Typography>
            {filter}
          </Stack>
        </TableCell>
      ))}
    </TableRow>
  );
});
