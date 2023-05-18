import {
  ChangeEvent,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import {
  Box,
  Collapse,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useDebouncedCallback } from "use-debounce";

import GenericTable from "../../layout/GenericTable";

import { columns } from "./config";

import synchroDB from "../../lib/service/dexie";

import { useGetRulesStatus } from "../../hooks";
import { GenericHeader } from "../GenericHeader";
import { EspecialConfigCell } from "./especialConfig";
import { LoadingContentTable } from "./loadingContent";
import { NoDataContent } from "./noData";
import { RuleDTO, RulesStatus } from "../../types/supabase";

interface WithCollapsibleProps {
  collapseContent: JSX.Element;
  colSpan?: number;
}

const WithCollapsible = ({
  children,
  collapseContent,
  colSpan,
}: PropsWithChildren<WithCollapsibleProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow
        sx={{
          cursor: "pointer",
          ":hover": {
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
        <TableCell colSpan={colSpan} padding={isOpen ? "normal" : "none"}>
          <Collapse
            in={isOpen}
            // Warning: considerar que puede no estar optimizado
            sx={{ "& .MuiCollapse-wrapperInner": { display: "flex" } }}
          >
            {collapseContent}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

interface EditableCommentProps {
  title: string;
  result: RulesStatus & RuleDTO;
}

const EditableComment = ({ title, result }: EditableCommentProps) => {
  // TODO: add waiter
  const _handleChange = useDebouncedCallback(
    async ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
      return await synchroDB.saveDescription(result, target.value);
    },
    500
  );
  return (
    <TextField
      multiline
      fullWidth
      sx={{ ml: 12, mr: 3, minHeight: "initial", height: "auto" }}
      defaultValue={result.description}
      title={title}
      placeholder="Ingresa el porqué del cambio"
      onChange={_handleChange}
    />
  );
};

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

  // TODO: refactor this spaghetti 💩,
  return (
    <>
      <GenericTable
        body={
          isLoading ? (
            <LoadingContentTable colSpan={columns.length} />
          ) : (
            <NoDataContent hasContent={!!data?.length} colSpan={columns.length}>
              {data?.map((result) => (
                <WithCollapsible
                  key={result.id}
                  colSpan={columns.length}
                  collapseContent={
                    <EditableComment
                      result={result}
                      title={`${result.id}-comments`}
                    />
                  }
                >
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
                </WithCollapsible>
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
          labelRowsPerPage="Filas por página"
        />
      </Box>
    </>
  );
}
