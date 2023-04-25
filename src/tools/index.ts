export const getEnvOrThorw = (envName: string) => {
  const env = import.meta.env[envName];

  if (!env) throw new Error(`Not found env ${envName}`);

  return env;
};

export const rexifyObjectKeys = (
  pojo: Record<string, string>,
  flags?: string
) => new RegExp(Object.keys(pojo).join(""), flags);

export const replaceByDict = (
  text: string,
  dict: Record<string, string>,
  flags?: string
) => text.replace(rexifyObjectKeys(dict, flags), (match) => dict[match]);
