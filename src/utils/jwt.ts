import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

const privateKey = fs.readFileSync(path.resolve(__dirname, './../../configs/shaKey/private.key'));

export const signData = <T extends {}>(payload: T | string | Buffer, expiresIn: string) => {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: expiresIn || '1h'});
}

export const verifyData = <T>(payload: string): T => {
  return jwt.verify(payload, privateKey, { algorithms: ['RS256']}) as T;
}