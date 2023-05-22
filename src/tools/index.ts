import { LocalStorageVisit } from '../types/constants';

export const getEnvOrThorw = (envName: string) => {
  const env = import.meta.env[envName];

  if (!env) throw new Error(`Not found env ${envName}`);

  return env;
};

export const rexifyObjectKeys = (
  pojo: Record<string, string>,
  flags?: string
) => new RegExp(Object.keys(pojo).join(''), flags);

export const replaceByDict = (
  text: string,
  dict: Record<string, string>,
  flags?: string
) => text.replace(rexifyObjectKeys(dict, flags), (match) => dict[match]);

export const DOMHideOverflow = (
  selector: string,
  isOpen = true,
  node = document.body
) => {
  const element = node.querySelector<HTMLElement>(selector);

  if (!element) return;

  element.style.overflow = isOpen ? 'hidden' : 'auto';
};

const shouldRepeatTour = (date: Date, times: number) => {
  const finalDate = new Date();
  finalDate.setHours(23);

  return date > finalDate && times <= 3;
};

export const visitHandler = () => {
  const firstVisit = localStorage.getItem(LocalStorageVisit.FIRST_VISIT);
  const timesVisit = localStorage.getItem(LocalStorageVisit.TIMES_VISIT);

  if (firstVisit || !shouldRepeatTour(new Date(firstVisit), Number(timesVisit)))
    return;

  localStorage.setItem(
    LocalStorageVisit.FIRST_VISIT,
    new Date().toDateString()
  );
  localStorage.setItem(
    LocalStorageVisit.TIMES_VISIT,
    ((Number(timesVisit) || 0) + 1).toString()
  );

  return true;
};

// eslint-disable-next-line eqeqeq
export const isNill = (data: unknown) => data != null;
