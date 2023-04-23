import { Stack, Typography } from "@mui/material";


interface InfoProps {
  icon: JSX.Element;
  primaryText: string;
  secondaryText?:string;
}

export const Info = ({icon, primaryText, secondaryText}: InfoProps)=> (
  <Stack
    direction='column'
    justifyContent='center'
    alignItems='center'
    minHeight={'50vh'}
    sx={{fontSize: 100}}
    gap={8}
>
  {icon}
  <Stack direction='column' gap={4}>
    <Typography color='GrayText' variant='h3'>{primaryText}</Typography>
    {
      secondaryText && 
        <Typography textAlign='center' color='GrayText' variant='body1'>
          {secondaryText}
        </Typography>
    }
  </Stack>
</Stack>
)
