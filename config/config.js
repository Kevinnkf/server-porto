import dotenv from 'dotenv';
dotenv.config();

const commonPostgres = {
  dialect: 'postgres',
  protocol: 'postgres',
  migrationFileExtension: '.mjs',
  useDefineForClassFields: true,
  logging: false,
};

export default {
  development: {
    ...commonPostgres,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'donadoni',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 5432),
  },
  test: {
    ...commonPostgres,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'donadoni',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 5432),
  },
  production: {
    ...commonPostgres,
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
