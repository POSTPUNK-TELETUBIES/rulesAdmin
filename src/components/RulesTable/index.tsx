import {  useMemo } from 'react';
import { ReadMore } from '@mui/icons-material';
import { TableCell, TablePagination, TableRow, Typography } from '@mui/material'
import GenericTable from '../../layout/GenericTable'
import { useGetRules } from './hooks'
import { StatusIcon } from '../StatusIcon';
import { GenericPopover } from '../GenericPopover';
import { UncontrolledSwitch } from '../Switch/uncontrolledIndexed';
import { columns } from './config';


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
  const [fetchMore, {results}] = useGetRules('AYebqLNQV6yygs-0Nat3')

  const flatedResults = useMemo(()=>  results?.data
    ?.map(({rules, ...rest})=> ({...rules, ...rest})), [results?.data])

  return (
    <GenericTable
      body={<>
        {flatedResults?.map((result)=>(
          <TableRow key={result.id}>
              {columns.map(({resource, especialConfig})=> {
                if(!especialConfig)
                  return (
                    <TableCell key={resource+result.id}>{String(result[resource]?? '--')}</TableCell>
                  )
                return (
                  <TableCell>
                    <EspecialConfigCell resource={resource} value={result[resource ]?? '--'}/>
                  </TableCell>
                )
              })}
          </TableRow>
        ))}
      </>} 
      header={
        <TableRow>
        {
          columns.map(({label})=> <TableCell key={label}>{label}</TableCell>)
        }
      </TableRow>}
        footer={<TablePagination 
        rowsPerPage={10}
        count={results?.total ?? 1000}
        page={results?.page ?? 1}
        onPageChange={()=> fetchMore()}
     />}
    />
  )
}
