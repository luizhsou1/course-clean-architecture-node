/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IEncrypter {
  encrypt(value: string): Promise<string>;
}
