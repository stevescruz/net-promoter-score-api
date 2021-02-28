import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';

import '@shared/infra/typeorm/';
import '@shared/container';
import apiConfig from '@config/api';
import routes from '@shared/infra/http/routes/routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(apiConfig.port, () => {
  console.log(`✅ - Server is listening to ${apiConfig.url}`);
});
