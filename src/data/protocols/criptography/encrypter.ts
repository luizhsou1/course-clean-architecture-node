/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface Encrypter {
  encrypt(value: string): Promise<string>;
}
