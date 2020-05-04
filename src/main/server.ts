require('dotenv').config();
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log(`Mongodb running at ${env.mongoUrl}`);

    const app = (await import('./config/app')).default;
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
  })
  .catch(console.error);
