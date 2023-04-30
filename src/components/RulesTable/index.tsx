import { Box, TableCell, TablePagination, TableRow } from "@mui/material";

import GenericTable from "../../layout/GenericTable";

import { columns } from "./config";

import { useGetRulesStatus } from "../../hooks";
import { GenericHeader } from "../GenericHeader";
import { MouseEvent, useCallback } from "react";
import { EspecialConfigCell } from "./especialConfig";
import { LoadingContentTable } from "./loadingContent";
import { NoDataContent } from "./noData";

// TODO: Abstract table and config
export function RulesTable() {
  const [
    setPage,
    setRowsPerPage,
    { data, isLoading, total, page, rowsPerPage },
  ] = useGetRulesStatus();

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
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

  // TODO: refactor this spagetti 💩,
  return (
    <>
      <GenericTable
        body={
          isLoading ? (
            <LoadingContentTable colSpan={columns.length} />
          ) : (
            <NoDataContent hasContent={!!data?.length} colSpan={columns.length}>
              {data?.map((result) => (
                <TableRow key={result.id}>
                  {columns.map(({ resource, especialConfig, textAlign }) => {
                    if (!especialConfig)
                      return (
                        <TableCell
                          sx={{ textAlign: textAlign ?? "center" }}
                          key={resource + result.id}
                        >
                          {String(result[resource] ?? "--")}
                        </TableCell>
                      );

                    return (
                      <TableCell
                        key={resource + result.id}
                        sx={{ textAlign: "center" }}
                      >
                        <EspecialConfigCell
                          result={result}
                          resource={resource}
                          secondaryValue={result.created_at}
                          value={result[resource] ?? "--"}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </NoDataContent>
          )
        }
        header={<GenericHeader data={columns} />}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TablePagination
          rowsPerPage={rowsPerPage}
          count={total ?? 1000}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por pagina"
        />
      </Box>
    </>
  );
}
