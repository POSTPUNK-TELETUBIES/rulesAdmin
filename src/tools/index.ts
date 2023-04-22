export const getEnvOrThorw = (envName: string) => {
  const env = import.meta.env[envName]

  if(!env)
    throw new Error(`Not found env ${envName}`)

  return env

}
