import { Typography } from "@mui/material"

import relative from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'
import dayjs from 'dayjs';
import { options } from "./config";

dayjs.extend(relative)
dayjs.locale('es')


interface TimeAgoProps {
  date: string | Date
}

export const TimeAgo = ({ date }: TimeAgoProps) => <Typography>
  {dayjs(date).from(new Date()).replace(
    /segundos|segundo|minutos|minuto|horas|hora/,
    match => options[match])}
</Typography>
