import appSettings from '@Config/settings';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const encrypt = async (text: string): Promise<string> => {
  const salt = await bcrypt.genSalt(appSettings.security.hash.saltRounds);
  return new Promise((res, rej) => {
    bcrypt.hash(text, salt, (err, hash) => {
      if (err) rej(err);
      res(hash);
    });
  });
};

const compare = async (text: string, hash: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    bcrypt.compare(text, hash, (err, isMatch) => {
      if (err) rej(err);
      res(isMatch);
    });
  });
};

const generateToken = async (
  payload: string | object | Buffer
): Promise<string> => {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      appSettings.security.jwt.secret,
      {
        expiresIn: appSettings.security.jwt.options.expiresIn,
      },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    );
  });
};

const decodeToken = async <T>(token: string): Promise<T | undefined> => {
  return new Promise((res, rej) => {
    jwt.verify(token, appSettings.security.jwt.secret, (err, decoded) => {
      if (err) rej(err);
      res(decoded as T);
    });
  });
};

const generateCode = async (): Promise<string> => {
  return new Promise(res => {
    const code = Math.random().toString(36).slice(-6).toUpperCase();

    res(code);
  });
};

export default {
  encrypt,
  compare,
  generateToken,
  decodeToken,
  generateCode,
};
