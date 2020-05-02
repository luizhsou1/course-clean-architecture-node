import { IAccountModel } from '../models/account';

/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IAddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface IAddAccount {
  add(account: IAddAccountModel): IAccountModel;
}
