import { MouseEvent, useCallback, useContext, useState } from 'react';
import {
  Box,
  Stack,
  TableCell,
  TablePagination,
  Tooltip,
  Typography,
} from '@mui/material';
import GenericTable from '../../layout/GenericTable';
import { columns } from './config';
import { useGetRulesStatus } from '../../hooks';
import { GenericHeader } from '../GenericHeader';
import { EspecialConfigCell } from './especialConfig';
import { LoadingContentTable } from './loadingContent';
import { NoDataContent } from './noData';
import { parseConditionallySonarKey } from '../../tools';
import { WithCollapsible } from './WithCollpasible';
import { EditableComment } from '../EditableComment';
import { SwitchContext, SwitchProvider } from '../Switch/switchContext';

// TODO: Abstract table and config
export function RulesTable() {
  const [
    setPage,
    setRowsPerPage,
    { data, isFetching, total, page, rowsPerPage },
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
      <SwitchProvider>
        <GenericTable
          body={
            isFetching ? (
              <LoadingContentTable colSpan={columns.length} />
            ) : (
              <NoDataContent
                hasContent={!!data?.length}
                colSpan={columns.length}
              >
                {isFetching
                  ? []
                  : data?.map((result) => (
                      <WithCollapsible
                        key={result.id}
                        colSpan={columns.length - 2}
                        collapseContent={
                          <Stack direction='row' pr={2}>
                            <EditableComment
                              result={result}
                              title={`${result.id}-comments`}
                            />
                          </Stack>
                        }
                      >
                        {columns.map(
                          ({ resource, especialConfig, textAlign }) => {
                            if (!especialConfig)
                              return (
                                <TableCell
                                  sx={{
                                    textAlign: textAlign ?? 'center',
                                    maxWidth: 140,
                                  }}
                                  key={resource + result.id}
                                >
                                  <Tooltip
                                    title={String(result[resource] ?? '--')}
                                  >
                                    <Typography
                                      noWrap
                                      sx={{
                                        ...(resource === 'key'
                                          ? { width: 60 }
                                          : {}),
                                      }}
                                    >
                                      {parseConditionallySonarKey(
                                        String(result[resource] ?? '--'),
                                        resource === 'key'
                                      )}
                                    </Typography>
                                  </Tooltip>
                                </TableCell>
                              );

                            return (
                              <TableCell
                                key={resource + result.id}
                                sx={{
                                  textAlign: textAlign ?? 'center',
                                }}
                              >
                                <EspecialConfigCell
                                  result={result}
                                  resource={resource}
                                  secondaryValue={result.created_at}
                                  value={result[resource] ?? '--'}
                                />
                              </TableCell>
                            );
                          }
                        )}
                      </WithCollapsible>
                    ))}
              </NoDataContent>
            )
          }
          header={<GenericHeader data={columns} />}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TablePagination
            rowsPerPage={rowsPerPage}
            count={total ?? 1000}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='Filas por página'
          />
        </Box>
      </SwitchProvider>
    </>
  );
}
