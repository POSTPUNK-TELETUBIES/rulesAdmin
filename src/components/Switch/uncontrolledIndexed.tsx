import { Switch } from "@mui/material";
import syncroDb from '../../lib/service/dexie'
import { ChangeEvent, useCallback } from "react";

interface UncontrolledSwitchProps {
  initialStatus: boolean;
  id: string;
}

//TODO: try to abstract this component to work with labbales too
export function UncontrolledSwitch({initialStatus, id}: UncontrolledSwitchProps){
  const _handleChange = useCallback((event: ChangeEvent<HTMLInputElement>)=> syncroDb.rulesStatus.put({
    id: Number(id),
    newStatus: event.target.checked,
    updated_at: new Date()
  }), [id])

  return <Switch 
    onChange={_handleChange}
    defaultChecked={initialStatus}
  />

}
