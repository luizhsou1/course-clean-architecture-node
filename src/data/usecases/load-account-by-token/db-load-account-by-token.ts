import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import { AccountModel } from '../../../domain/models/account';
import { Decrypter } from '../../protocols/criptography/decrypter';
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const tokenDecrypted = await this.decrypter.decrypt(accessToken);
    if (tokenDecrypted) {
      const account = await this.loadAccountByTokenRepository.loadByToken(tokenDecrypted, role);
      if (account) {
        return account;
      }
    }
    return null;
  }
}