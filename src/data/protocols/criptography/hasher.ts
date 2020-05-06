/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface Hasher {
  hash(value: string): Promise<string>;
}
