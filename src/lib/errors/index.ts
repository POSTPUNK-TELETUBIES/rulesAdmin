export class RequiredEnvError extends Error {
  constructor(envName: CustomEnvKeys) {
    super(
      `${envName} is required, please do check .envexample to provide one similar into .env file`
    );
  }
}
