import { FolderOff, Visibility } from "@mui/icons-material";
import dayjs from "dayjs";
import {
  Box,
  CircularProgress,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import GenericTable from "../../layout/GenericTable";

import GenericPopover from "../../layout/GenericPopover";
import { UncontrolledSwitch } from "../Switch/uncontrolledIndexed";
import { columns } from "./config";

import { useGetRulesStatus } from "../../hooks";
import { GenericHeader } from "../GenericHeader";
import { Info } from "../../layout/Info";
import { MouseEvent, useCallback, useState } from "react";
import { TimeAgo } from "../TimeAgo";

interface ExpecialConfigCell {
  resource: string;
  value: unknown;
  id: string;
  secondaryValue?: string | Date;
}

// TODO: check another abstraction for especial cases
const EspecialConfigCell = ({
  resource,
  value,
  id,
  secondaryValue,
}: ExpecialConfigCell) => {
  if (resource === "isActiveSonar")
    return <Typography>{value ? "Activo" : "Inactivo"}</Typography>;

  if (resource === "htmlDesc")
    return (
      <GenericPopover
        icon={<Visibility />}
        popoverBody={
          <Typography dangerouslySetInnerHTML={{ __html: String(value) }} />
        }
      />
    );

  if (resource === "updated_at")
    return Math.abs(dayjs(String(value)).diff(secondaryValue, "hours")) > 6 ? (
      <TimeAgo date={String(value)} />
    ) : (
      <Typography align="center">--</Typography>
    );

  return <UncontrolledSwitch initialStatus={Boolean(value)} id={id} />;
};

export function RulesTable() {
  const [setPage, { data, isLoading, total, page }] = useGetRulesStatus();

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      if (!event) return;

      setPage(newPage + 1);
    },
    [setPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [setPage]
  );

  if (isLoading)
    return (
      <Box display="grid" sx={{ placeContent: "center", minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );

  if (!data?.length)
    return (
      <Info
        icon={<FolderOff color="disabled" fontSize="inherit" />}
        primaryText="Sin datos"
        secondaryText="Selecciona filtros"
      />
    );

  return (
    <GenericTable
      body={
        <>
          {data?.map((result) => (
            <TableRow key={result.id}>
              {columns.map(({ resource, especialConfig }) => {
                if (!especialConfig)
                  return (
                    <TableCell key={resource + result.id}>
                      {String(result[resource] ?? "--")}
                    </TableCell>
                  );

                return (
                  <TableCell key={resource + result.id}>
                    <EspecialConfigCell
                      id={result.id}
                      resource={resource}
                      secondaryValue={result.created_at}
                      value={result[resource] ?? "--"}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </>
      }
      header={<GenericHeader data={columns} />}
      footer={
        <TablePagination
          rowsPerPage={rowsPerPage}
          count={total ?? 1000}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      }
    />
  );
}
