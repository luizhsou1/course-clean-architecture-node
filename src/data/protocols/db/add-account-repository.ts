/* eslint-disable @typescript-eslint/interface-name-prefix */
import { AddAccountModel } from '../../../domain/usecases/add-account';
import { AccountModel } from '../../../domain/models/account';

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>;
}
