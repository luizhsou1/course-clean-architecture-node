/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IAddAccountModel } from '../../domain/usecases/add-account-interface';
import { IAccountModel } from '../../domain/models/account-interface';

export interface IAddAccountRepository {
  add(account: IAddAccountModel): Promise<IAccountModel>;
}
