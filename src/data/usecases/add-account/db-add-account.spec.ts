/* eslint-disable @typescript-eslint/interface-name-prefix */
import { DbAddAccount } from './db-add-account';
import { Hasher, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account-protocols';

const makeEncrypter = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new HasherStub();
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
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): ISutTypes => {
  const hasherStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountrepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub);
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
  };
};

describe('', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const encrypterSpy = jest.spyOn(hasherStub, 'hash');
    await sut.add(makeFakeAccountData());
    expect(encrypterSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
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

  test('Should throw if Hasher throws', async () => {
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
