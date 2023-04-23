import { FormControl, FormControlLabel, Switch } from "@mui/material"
import { ChangeEvent, useCallback } from "react"
import { setActivateFilterChange } from "../../lib/observers"

export const ActivateFilter = () => {
  const _handleChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{

    setActivateFilterChange(event.target.checked)
  }, [])

  return (
    <FormControl>
      <FormControlLabel 
        control={<Switch defaultChecked onChange={_handleChange}/>} 
        label='Activacion' 
      />
    </FormControl>
  )
}
