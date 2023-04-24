import { TableCell, TableRow, Typography, Stack} from "@mui/material"
import { ColumnConfig } from '../RulesTable/config'
import { memo } from "react"

interface GenericHeaderProps {
  data: ColumnConfig[]
}

export const GenericHeader = memo(({data}: GenericHeaderProps)=>(
  <TableRow>
    {
      data.map(({label, icon})=> <TableCell key={label} >
        <Stack direction='row' gap={1}>
          {icon}
          <Typography>{label}</Typography>
        </Stack>
      </TableCell>)
    }
  </TableRow>
))
