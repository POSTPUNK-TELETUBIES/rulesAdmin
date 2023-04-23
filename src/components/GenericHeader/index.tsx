import { TableCell, TableRow } from "@mui/material"
import { ColumnConfig } from "../RulesTable/config"
import { memo } from "react"

interface GenericHeaderProps {
  data: readonly ColumnConfig[]
}

export const GenericHeader = memo(({data}: GenericHeaderProps)=>(
  <TableRow>
    {
      data.map(({label})=> <TableCell key={label}>{label}</TableCell>)
    }
  </TableRow>
))
