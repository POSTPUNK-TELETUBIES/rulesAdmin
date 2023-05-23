import { ReactNode } from 'react';
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

const sonaKeyLangaugesBlackList: Record<string, number | boolean> = {
  css: 1,
  java: 1,
  web: 1,
  Web: 1,
  javascript: 1,
  typescript: 1,
};

export const parseSonarKey = (
  text: string,
  blackList = sonaKeyLangaugesBlackList
) => {
  const [match] = text.match(/^.+:/);
  if (!blackList[match.substring(0, match.length - 1)]) return text;

  return text.replace(match, '');
};

export const parseConditionallySonarKey = (
  text: string,
  needsParse: boolean,
  blackList?: Record<string, number | boolean>
) => (!needsParse ? text : parseSonarKey(text, blackList));

export const renderConditional = <T extends ReactNode = ReactNode>(
  isRender: boolean,
  falseValue: T,
  trueValue: T
) => (isRender ? falseValue : trueValue);

/**
 * Returns a POJO like `{'123asd' : {id: '123asd', name: 'Juan'}, ...}`.
 * For instance, if you have an array of users where user is
 * ```ts
 * User{
 *   id: string;
 *   name: string;
 *   lastName: string;
 * }
 * const users: User[] = [user1, user2]
 * keyBy(users, 'id') = {
 *   'idUser1': user1,
 *   'idUser2' user2 // The values are of type User
 * }
 *
 * ```
 * @param array Data to convert to hash map
 * @param key
 * @param value
 * @returns Returns a hash map (a.k.a. POJO)
 */

export const keyBy = <T = unknown, R = T>(
  array: T[],
  key: string,
  value?: string
): Record<string, R> =>
  array?.reduce((acmPojo, nextData) => {
    acmPojo[String(nextData[key])] = value ? nextData[value] : nextData;

    return acmPojo;
  }, {});
