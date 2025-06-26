import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const startServer = async () => {
  await initMongoConnection();

  setupServer();
};

void startServer();
