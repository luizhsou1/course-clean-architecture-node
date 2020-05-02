import { IAddAccount, IAddAccountModel } from '../../../domain/usecases/add-account-interface';
import { IAccountModel } from '../../../domain/models/account-interface';
import { IEncrypter } from '../../protocols/encrypter-interface';

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;
  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }

  async add(account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}
