import { FolderOff, ReadMore } from '@mui/icons-material';
import { CircularProgress, TableCell, TablePagination, TableRow, Typography } from '@mui/material'
import relative from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'
import dayjs from 'dayjs';

import GenericTable from '../../layout/GenericTable'
import { StatusIcon } from '../StatusIcon';
import { GenericPopover } from '../GenericPopover';
import { UncontrolledSwitch } from '../Switch/uncontrolledIndexed';
import { columns } from './config';

import { useGetRulesStatus } from '../../hooks';
import { GenericHeader } from '../GenericHeader';
import { Info } from '../../layout/Info';

dayjs.extend(relative)
dayjs.locale('es')

interface TimeAgoProps {
  date: string | Date
}

const TimeAgo = ({date}: TimeAgoProps)=> <Typography>
    {dayjs(date).from(new Date())}
  </Typography>


// TODO: check another abstraction for especial cases
const EspecialConfigCell = ({resource, value, id} : {resource: string; value: unknown; id: string;})=>{
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

  if(resource === 'updated_at')
    return <TimeAgo date={String(value)} />

  return <UncontrolledSwitch initialStatus={Boolean(value)} id={id}/>
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
              {columns.map(({resource, especialConfig, icon})=> {
                if(!especialConfig)
                  return <TableCell 
                    key={resource+result.id}>
                      {String(result[resource]?? '--')}
                    </TableCell>

                return (
                  <TableCell key={resource+result.id}>
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

      header={<GenericHeader data={columns}/>}

      footer={<TablePagination 
        rowsPerPage={10}
        count={total ?? 1000}
        page={page - 1 ?? 1}
        onPageChange={()=> setPage(prev => prev + 1)}
      />}
    />
  )
}
