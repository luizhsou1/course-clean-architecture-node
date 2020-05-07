import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyMongoRepository } from './survey-mongo-repository';
import { Collection } from 'mongodb';
import { AddSurveyModel } from '../../../../domain/usecases/add-survey';

let surveyCollection: Collection;

const makeFakeAddSurveyModel = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
    { answer: 'other_answer' },
  ],
});

describe('Survey Mongo Repository', () => {
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

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository();
  };

  test('Should add a survey sucess', async () => {
    const sut = makeSut();
    const fakeAddSurveyModel = makeFakeAddSurveyModel();
    await sut.add(fakeAddSurveyModel);
    const survey = await surveyCollection.findOne({ question: fakeAddSurveyModel.question });
    expect(survey).toBeTruthy();
  });
});
