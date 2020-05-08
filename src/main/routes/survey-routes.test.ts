import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';

let surveyCollection: Collection;

describe('Suvey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
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
  });
});
