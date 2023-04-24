import { FolderOff, ReadMore } from '@mui/icons-material';
import { CircularProgress, TableCell, TablePagination, TableRow, Typography } from '@mui/material'

import GenericTable from '../../layout/GenericTable'

import { GenericPopover } from '../GenericPopover';
import { UncontrolledSwitch } from '../Switch/uncontrolledIndexed';
import { columns } from './config';

import { useGetRulesStatus } from '../../hooks';
import { GenericHeader } from '../GenericHeader';
import { Info } from '../../layout/Info';
import { MouseEvent, useCallback, useState } from 'react';
import { TimeAgo } from '../TimeAgo';




// TODO: check another abstraction for especial cases
const EspecialConfigCell = ({resource, value, id} : {resource: string; value: unknown; id: string;})=>{
  if(resource === 'isActiveSonar')
    return <Typography>
      {value ? 'Activo' : 'No activo'}
    </Typography>

  if (resource === 'htmlDesc')
    return (<GenericPopover
      icon={<ReadMore />}
      popoverBody={
        <Typography
          dangerouslySetInnerHTML={{ __html: String(value) }}
        />
      } />)

  if(resource === 'updated_at')
    return <TimeAgo date={String(value)} />

  return <UncontrolledSwitch initialStatus={Boolean(value)} id={id}/>
}


export function RulesTable() {
  const [setPage, { data, isLoading, total, page }] = useGetRulesStatus()

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = useCallback((
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (!event) return
    setPage(newPage)
  }, [setPage])

  const handleChangeRowsPerPage = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, [setPage]);

  if (isLoading)
    return <CircularProgress />

  if (!data)
    return (
      <Info
        icon={<FolderOff color='disabled' fontSize='inherit' />}
        primaryText='Sin datos'
        secondaryText='Selecciona filtros'
      />)

  return (
    <GenericTable
      body={<>
        {data?.map((result) => (
          <TableRow key={result.id}>
              {columns.map(({resource, especialConfig}) => {
                if(!especialConfig)
                  return <TableCell 
                    key={resource+result.id}>
                      {String(result[resource]?? '--')}
                    </TableCell>

              return (
                <TableCell key={resource + result.id}>
                  <EspecialConfigCell
                    id={result.id}
                    resource={resource}
                    value={result[resource] ?? '--'}
                  />
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </>}

      header={<GenericHeader data={columns} />}

      footer={<TablePagination
        rowsPerPage={rowsPerPage}
        count={total ?? 1000}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
    />
  )
}
