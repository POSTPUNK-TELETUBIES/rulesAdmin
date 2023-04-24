import { Box, IconButton, Popover } from "@mui/material";
import { MouseEvent, useCallback, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

interface GenericPopoverProps {
  popoverBody: JSX.Element,
  icon: JSX.Element
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
        anchorEl={popOverRef}
        >
        <Box sx={{ width: '95vh', minWidth: '30rem', height: '100%' }}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            mt={2}
            mr={2}
            ml={2}
            mb={2}
          >
            <Stack
              direction="row"
              justifyContent="flex-start" alignItems="center"
              spacing={2}
            >
              <Item>Type 1</Item>
              <Item>Type 2</Item>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-end" alignItems="center"
              spacing={2}
            >
              <Item>Regla Act/Inact desde</Item>
              <Item>XXX</Item>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={15}
            mt={2}
            mr={2}
            ml={2}
            mb={2}
          >
            <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ flexGrow: 1 }}>
              <Item sx={{ width: '100%' }}>XXXXXX</Item>
            </Stack>
          </Stack>

          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            mt={2}
            mr={2}
            ml={2}
            mb={2}
          >
            <Stack direction="row">
              <Item>Descripción de la Regla</Item>
            </Stack>
            <Stack direction="row"
          justifyContent="flex-start"
          alignItems="flex-start">
              <Item sx={{ width: '100%', height: '100%', textAlign: 'left' }}>{popoverBody}</Item>
            </Stack>
          </Stack>
          <IconButton
          onClick={_handleClose}
          sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            <CloseIcon sx={{ fontSize: 'small' }} />
          </IconButton>
        </Box>
      </Popover>
    </>

  )
}
