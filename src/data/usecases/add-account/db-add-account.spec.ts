/* eslint-disable @typescript-eslint/interface-name-prefix */
import { DbAddAccount } from './db-add-account';
import { Encrypter, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account-protocols';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new EncrypterStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
});

const makeAddAccountrepository = (): AddAccountRepository => {
  class AddAccountrepositoryStuby implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountrepositoryStuby();
};

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
});

interface ISutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): ISutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountrepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe('', () => {
  test('Should call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.add(makeFakeAccountData());
    expect(encrypterSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    });
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should return an account on sucess', async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAccountData());
    await expect(account).toEqual(makeFakeAccount());
  });
});
