import path from 'node:path';

export const SWAGGER_PATH = path.join(
  process.cwd(),
  'docs',
  'swagger.json',
);

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
// export const FIFTEEN_MINUTES = 10 * 1000;
// export const ONE_DAY = 30 * 1000;

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
