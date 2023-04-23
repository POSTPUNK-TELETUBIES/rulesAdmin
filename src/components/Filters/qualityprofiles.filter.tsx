import { useQuery } from "@tanstack/react-query"
import { useLanguageFilter } from "../../lib/observers"
import { fetchClient } from "../../lib/modules/fetchClient"
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export const QualityProfileFilter = ()=>{
  const text = useLanguageFilter()

  const { data, isFetching } = useQuery({
    queryKey: ['qualityprofile', text], 
    queryFn: () => fetchClient.getQualityProfilesByLanguage(text),
    enabled: !!text,
  })

  if(isFetching)
    return <CircularProgress />

  return (
    <FormControl sx={{minWidth: 200}}>
      <InputLabel id="qualityprofile">Quality Profile</InputLabel>
      <Select
        label='Quality Profile'
        labelId="qualityprofile"
        defaultValue={''}
        displayEmpty
      >
        {data?.map(({id, name})=> (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
   
  )
}
