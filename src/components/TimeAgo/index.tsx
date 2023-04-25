import { Typography } from "@mui/material";

import relative from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import dayjs from "dayjs";
import { options } from "./config";
import { replaceByDict } from "../../tools";

dayjs.extend(relative);
dayjs.locale("es");

interface TimeAgoProps {
  date: string | Date;
}

export const TimeAgo = ({ date }: TimeAgoProps) => (
  <Typography align="right">
    {replaceByDict(dayjs(date).from(new Date()), options).replace(
      /una|un/,
      "1"
    )}
  </Typography>
);
