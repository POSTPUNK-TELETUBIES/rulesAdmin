import { Typography } from "@mui/material";

import relative from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/es";
import dayjs from "dayjs";

dayjs.locale("es");
dayjs.extend(relative);
dayjs.extend(updateLocale);

interface TimeAgoProps {
  date: string | Date;
}

dayjs.updateLocale("es", {
  relativeTime: {
    s: "1 s",
    m: "1 min",
    h: "1 h",
    d: "1 d",
  },
});

export const TimeAgo = ({ date }: TimeAgoProps) => (
  <Typography align="right">{dayjs(date).from(new Date())}</Typography>
);
