import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import { AccountModel } from '../../../domain/models/account';
import { Decrypter } from '../../protocols/criptography/decrypter';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  load(accessToken: string, role?: string): Promise<AccountModel> {
    this.decrypter.decrypt(accessToken);
    return null;
  }
}
