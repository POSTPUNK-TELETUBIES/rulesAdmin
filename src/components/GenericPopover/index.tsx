import { IconButton, Popover } from "@mui/material";
import { MouseEvent, useCallback, useState } from "react";

interface GenericPopoverProps {
  popoverBody: JSX.Element,
  icon: JSX.Element
}

export function GenericPopover({popoverBody, icon}: GenericPopoverProps){
  const [popOverRef, setPopOverRef] = useState<HTMLButtonElement | null>(null)

  const _handleClick = useCallback((event: MouseEvent<HTMLButtonElement>)=>{
    setPopOverRef(event.currentTarget)
  }, [])

  const _handleClose = useCallback(()=> {
    setPopOverRef(null)
  }, [])

  return (
    <>
      <IconButton onClick={_handleClick} sx={{margin: 'auto'}}>
        {icon}
      </IconButton>
      <Popover
        open={Boolean(popOverRef)}
        onClose={_handleClose}
        anchorEl={popOverRef}
        >
        {popoverBody}
      </Popover>
    </>

  )
}
