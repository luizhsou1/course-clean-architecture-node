import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter/bcrypt-adapter';

let accountCollection: Collection;

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    accountCollection.deleteMany({}); // Remove todos os registros do documento account
  });

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Luiz',
          email: 'luizhsou1@gmail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const bcryptAdapter = new BcryptAdapter(12);
      const password = await bcryptAdapter.hash('123');
      await accountCollection.insertOne({
        name: 'Luiz',
        email: 'luizhsou1@gmail.com',
        password,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'luizhsou1@gmail.com',
          password: '123',
        })
        .expect(200);
    });

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'luizhsou1@gmail.com',
          password: '123',
        })
        .expect(401);
    });
  });
});
