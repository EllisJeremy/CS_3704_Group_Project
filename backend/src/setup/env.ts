function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

function getEnvNumber(key: string): number {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  const n = Number(value);
  if (Number.isNaN(n)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return n;
}

export const env = {
  PORT: getEnvNumber("PORT"),
  NODE_ENV: getEnv("NODE_ENV"),

  JWT_SECRET: getEnv("JWT_SECRET"),

  DATABASE_PORT: getEnvNumber("DATABASE_PORT"),
  DATABASE_USER: getEnv("DATABASE_USER"),
  DATABASE_PASSWORD: getEnv("DATABASE_PASSWORD"),
  DATABASE_NAME: getEnv("DATABASE_NAME"),
  DATABASE_URL: getEnv("DATABASE_URL"),
} as const;
