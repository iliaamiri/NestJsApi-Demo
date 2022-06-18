import { DateTime } from 'luxon';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { rootPath } from 'get-root-path';

import UserDTO from '../../models/UserDTO';
import JWTTokenRawDataDTO from '../../models/JWTTokenRawDataDTO';
import TokenDTO from '../../models/TokenDTO';
import ITokenService from './ITokenService';
import { Injectable, Scope } from '@nestjs/common';

const makeTokenModel = (
  userId: number,
  tokenValue: string,
  expiresInTimestamp: number,
): TokenDTO => {
  return {
    UserId: userId,
    JWTTokenValue: tokenValue,
    ExpiryDate: expiresInTimestamp,
  };
};

@Injectable({ scope: Scope.DEFAULT })
class TokenService implements ITokenService {
  public allTokens = new Map<string, TokenDTO>();

  private static async getPrivateKey(): Promise<string> {
    return fs.readFileSync(rootPath + 'jwtRS256.key').toString();
  }

  private static async getPublicKey(): Promise<string> {
    return fs.readFileSync(rootPath + 'jwtRS256.key.pub').toString();
  }

  public async create(
    user: UserDTO,
    expiresIn: DateTime = DateTime.now().plus({ day: 1 }),
  ): Promise<string | null> {
    // Getting the timestamp for the expiry date.
    const expiresInTimestamp = expiresIn.valueOf();

    let newJwtToken = '';
    // For some reason I don't know, JWT library throws an error when running for the first time.
    // So, this for loop tries to re-try the process so that it always works regardless.
    for (let i = 0; i < 2; i++) {
      try {
        const payload: JWTTokenRawDataDTO = {
          UserId: user.Id,
          Username: user.Username,
          CreatedAt: Date.now(),
        };
        const privateKey: string = await TokenService.getPrivateKey();
        const options: jwt.SignOptions = {
          algorithm: 'RS256',
          expiresIn: expiresInTimestamp,
        };

        newJwtToken = jwt.sign(
          payload,
          privateKey, // Private Key loaded from jwtRS256.key file.
          options,
        );

        break;
      } catch (err) {
        console.debug(err); // debug 🤷
      }
    }

    const newTokenObject = makeTokenModel(
      user.Id,
      newJwtToken,
      expiresInTimestamp,
    );

    this.allTokens.set(newJwtToken, newTokenObject);

    return newJwtToken;
  }

  async verifyIntegrity(
    tokenValue: string,
  ): Promise<false | JWTTokenRawDataDTO> {
    try {
      const publicKey: string = await TokenService.getPublicKey();
      const options = {
        complete: true,
        algorithms: ['RS256'],
      } as jwt.VerifyOptions;

      // Try to decode the JWT token value using Public Key (RS256 Algorithm).
      const decodedData: any = jwt.verify(tokenValue, publicKey, options);

      // Check if whether the decodedData is there, and it has the three properties of a valid token (playerId, username, and
      // createdAt). If not, return `false` to say it is invalid.
      if (
        !decodedData ||
        !decodedData.playerId ||
        !decodedData.username ||
        !decodedData.createdAt
      ) {
        return false;
      }

      // Return the decoded payload (data) if the JWT token were valid.
      return decodedData;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async revoke(tokenValue: string): Promise<boolean> {
    this.allTokens.delete(tokenValue);
    return true;
  }
}

export default TokenService;
