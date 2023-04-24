import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { Type } from "../../types/supabase"
import { useCallback } from "react"
import { setRuleTypeFilterChange } from "../../lib/observers"

const typesValues = Object.freeze(Object.values(Type))

export const TypesFilter = () => {
  const _handleChange = useCallback((event: SelectChangeEvent)=> 
   setRuleTypeFilterChange(event.target.value)
  , [])

  return (
    <FormControl sx={{minWidth: 120}}>
      <InputLabel id='type'>Tipo</InputLabel>
      <Select
        label='Tipo'
        labelId='type'
        onChange={_handleChange}
        sx={{maxWidth: 120}}
        defaultValue={'all'}
        displayEmpty
      >
        {
          <MenuItem value={'all'}>
            TODOS
          </MenuItem>
        }
        {
          typesValues.map((type)=> <MenuItem key={type} value={type}>
            {type}
          </MenuItem>)
        }
      </Select>
    </FormControl>
  )
}
