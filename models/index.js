import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';
import process from 'process';
import dotenv from 'dotenv';
import configFile from '../config/config.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const db = {};

let sequelize;

if (process.env.DATABASE_URL) {
    // for prod
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else if (config.use_env_variable) {
  // Fallback to local
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // local dev settings 
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Dynamically import all model definitions
const files = fs.readdirSync(__dirname).filter(file => (
  file.indexOf('.') !== 0 &&
  file !== basename &&
  file.slice(-3) === '.js' &&
  !file.endsWith('.test.js')
));

await Promise.all(
  files.map(async (file) => {
    const fileUrl = pathToFileURL(path.join(__dirname, file)).href;
    const modelModule = await import(fileUrl);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })
);

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export sequelize instance & models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;