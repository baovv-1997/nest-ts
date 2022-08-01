import * as crypto from 'crypto';

export const hashString = (stringOrg: string, salt = process.env.BCRYPT_SALT): string => {
  return crypto.pbkdf2Sync(stringOrg, salt, 1000, 64, 'sha512').toString('hex');
}