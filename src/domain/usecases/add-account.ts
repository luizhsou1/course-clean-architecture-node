import { AccountModel } from '../models/account';

/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>;
}
