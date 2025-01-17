import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account-mongo-repository';
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

  describe('add()', () => {
    test('Should return an account on add sucess', async () => {
      const sut = makeSut();
      const account = await sut.add(makeFakeAddAccountModel());
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });
  });

  describe('loadByEmail()', () => {
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
  });

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAcessToken success', async () => {
      const sut = makeSut();
      const result = await accountCollection.insertOne(makeFakeAddAccountModel());
      const fakeAccount = result.ops[0];
      expect(fakeAccount.accessToken).toBeFalsy();
      await sut.updateAccessToken(fakeAccount._id, 'any_token');
      const account = await accountCollection.findOne({ _id: fakeAccount._id });
      expect(account).toBeTruthy();
      expect(account.accessToken).toBe('any_token');
    });
  });

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({ ...makeFakeAddAccountModel(), accessToken: 'any_token' });
      const account = await sut.loadByToken('any_token');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({ ...makeFakeAddAccountModel(), accessToken: 'any_token', role: 'admin' });
      const account = await sut.loadByToken('any_token', 'admin');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    test('Should return null loadByToken with invalid role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({ ...makeFakeAddAccountModel(), accessToken: 'any_token' });
      const account = await sut.loadByToken('any_token', 'admin');
      expect(account).toBeFalsy();
    });

    test('Should return an account on loadByToken with if is user is admin', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({ ...makeFakeAddAccountModel(), accessToken: 'any_token', role: 'admin' });
      const account = await sut.loadByToken('any_token');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut();
      const account = await sut.loadByEmail('any_token');
      expect(account).toBeFalsy();
    });
  });
});
