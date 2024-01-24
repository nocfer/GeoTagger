import Joi from 'joi';

enum NodeEnvs {
  development = 'development',
  test = 'test',
  staging = 'staging',
  production = 'production'
}

enum LogLevels {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug'
}

type EnvVars = {
  nodeEnv: NodeEnvs;
  logLevel: LogLevels;
  isDevEnv: boolean;
  isProdEnv: boolean;
  isTestEnv: boolean;
  exiftool: {
    configFile: string;
    supportedExtensions: string;
  };
};

// define validation for all the env variables
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid(Object.values(NodeEnvs)).default('test'),
  LOG_LEVEL: Joi.string(),
  EXIFTOOL_CONFIG_FILE: Joi.string().required(),
  EXIFTOOL_SUPPORTED_EXTENSIONS: Joi.string().required()
})
  .unknown()
  .required();

const { error, value: envVars } = envSchema.validate(process.env);

// catch any config error
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// create config file
const env: EnvVars = {
  nodeEnv: envVars.NODE_ENV,
  logLevel: envVars.LOG_LEVEL,
  isDevEnv: envVars.NODE_ENV === 'development',
  isProdEnv: envVars.NODE_ENV === 'production',
  isTestEnv: envVars.NODE_ENV === 'test',
  exiftool: {
    configFile: envVars.EXIFTOOL_CONFIG_FILE,
    supportedExtensions: envVars.EXIFTOOL_SUPPORTED_EXTENSIONS
  }
};

export default env;
