import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';
import { Collection } from 'mongodb';
import { AddAccountModel } from '../../../../domain/usecases/add-account';

let accountCollection: Collection;

const makeFakeAddAccountModel = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

describe('Account Mongo Repository', () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test('Should return an account on add sucess', async () => {
    const sut = makeSut();
    const account = await sut.add(makeFakeAddAccountModel());
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('Should return an account on loadByEmail sucess', async () => {
    const sut = makeSut();
    await accountCollection.insertOne(makeFakeAddAccountModel());
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeFalsy();
  });

  test('Should update the account acessToken on updateAcessToken success', async () => {
    const sut = makeSut();
    const result = await accountCollection.insertOne(makeFakeAddAccountModel());
    const fakeAccount = result.ops[0];
    expect(fakeAccount.acessToken).toBeFalsy();
    await sut.updateAcessToken(fakeAccount._id, 'any_token');
    const account = await accountCollection.findOne({ _id: fakeAccount._id });
    expect(account).toBeTruthy();
    expect(account.acessToken).toBe('any_token');
  });
});
