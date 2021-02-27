import 'dotenv/config';
import express from 'express';

import apiConfig from '@config/api';
import routes from '@shared/infra/http/routes/routes';

const app = express();

app.use(routes);

app.listen(apiConfig.port, () => {
  console.log(`✅ - Server is listening to ${apiConfig.url}`);
});