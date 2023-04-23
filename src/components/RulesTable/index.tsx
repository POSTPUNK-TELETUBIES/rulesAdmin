import { FolderOff, ReadMore } from '@mui/icons-material';
import { CircularProgress, TableCell, TablePagination, TableRow, Typography } from '@mui/material'
import GenericTable from '../../layout/GenericTable'
import { StatusIcon } from '../StatusIcon';
import { GenericPopover } from '../GenericPopover';
import { UncontrolledSwitch } from '../Switch/uncontrolledIndexed';
import { columns } from './config';

import { useGetRulesStatus } from '../../hooks';
import { GenericHeader } from '../GenericHeader';
import { Info } from '../../layout/Info';


function EspecialConfigCell({resource, value} : {resource: string; value: unknown;}){
  if(resource === 'isActiveSonar')
    return <StatusIcon isActive={Boolean(value)}/>

  if(resource === 'htmlDesc')
    return (<GenericPopover 
      icon={<ReadMore />}
      popoverBody={
        <Typography 
          dangerouslySetInnerHTML={{__html:String(value)}} 
        />
    } />)
  
  return <UncontrolledSwitch initialStatus={Boolean(value)}/>
}


export function RulesTable(){
  const [setPage, {data, isLoading, total, page}] = useGetRulesStatus()
 
  if(isLoading)
    return <CircularProgress />

  if(!data)
    return (
      <Info 
        icon={<FolderOff color='disabled' fontSize='inherit' />} 
        primaryText='Sin datos' 
        secondaryText='Selecciona filtros'
      />)

  return (
    <GenericTable
      body={<>
        {data?.map((result)=>(
          <TableRow key={result.id}>
              {columns.map(({resource, especialConfig})=> {
                if(!especialConfig)
                  return <TableCell key={resource+result.id}>{String(result[resource]?? '--')}</TableCell>

                return (
                  <TableCell>
                    <EspecialConfigCell resource={resource} value={result[resource ]?? '--'}/>
                  </TableCell>
                )
              })}
          </TableRow>
        ))}
      </>} 

      header={<GenericHeader data={columns}/>}

      footer={<TablePagination 
        rowsPerPage={10}
        count={total ?? 1000}
        page={page ?? 1}
        onPageChange={()=> setPage(prev => prev + 1)}
      />}
    />
  )
}
