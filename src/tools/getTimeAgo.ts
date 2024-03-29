import updateLocale from 'dayjs/plugin/updateLocale';
import relative from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import dayjs from 'dayjs';

dayjs.extend(updateLocale);
dayjs.locale('es');
dayjs.extend(relative);

dayjs.updateLocale('es', {
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: '1 s',
    m: '1 min',
    mm: '%d min',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 M',
    MM: '%d M',
    y: '1 Y',
    yy: '%d Y',
  },
});

export const getTimeAgo = (date: string | Date) => {
  return dayjs(date).from(new Date());
};
