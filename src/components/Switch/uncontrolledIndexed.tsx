import { Switch } from "@mui/material";

//TODO: try to abstract this component to work with labbales too
export function UncontrolledSwitch({initialStatus}: {initialStatus: boolean;}){
  // TODO: conect to dexijs
  return <Switch defaultChecked={initialStatus}/>

}
