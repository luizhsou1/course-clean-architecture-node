import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

describe('Suvey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    accountCollection = await MongoHelper.getCollection('accounts');
    surveyCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'https://domain.com/images/clean-node-api/image1',
            },
            {
              answer: 'Answer 2',
              image: 'https://domain.com/images/clean-node-api/image2',
            },
            {
              answer: 'Answer 3',
              image: 'https://domain.com/images/clean-node-api/image3',
            },
            {
              answer: 'Answer 4',
              image: 'https://domain.com/images/clean-node-api/image4',
            },
          ],
        })
        .expect(403);
    });

    test('Should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Luiz',
        email: 'luizhsou1@gmail.com',
        password: '123',
        role: 'admin',
      });
      const id = res.ops[0]._id;
      const accessToken = sign({ id }, env.jwtSecret);
      await accountCollection.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            accessToken,
          },
        },
      );
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'https://domain.com/images/clean-node-api/image1',
            },
            {
              answer: 'Answer 2',
              image: 'https://domain.com/images/clean-node-api/image2',
            },
          ],
        })
        .expect(204);
    });
  });
});
