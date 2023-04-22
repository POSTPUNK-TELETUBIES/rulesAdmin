import { Switch } from "@mui/material";

export function UncontrolledSwitch({initialStatus}: {initialStatus: boolean;}){
  // TODO: conect to dexijs
  return <Switch defaultChecked={initialStatus}/>

}
