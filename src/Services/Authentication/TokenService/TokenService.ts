import { DateTime } from 'luxon';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { rootPath } from 'get-root-path';

import AuthenticatedUser from '../../../Models/AuthenticatedUser';
import JWTTokenRawDataDTO from '../../../Models/JWTTokenRawDataDTO';
import TokenDTO from '../../../Models/TokenDTO';
import ITokenService from './ITokenService';
import { Inject, Injectable, Scope } from '@nestjs/common';
import ITokenRepository from '../TokenRepository/ITokenRepository';

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
  constructor(
    @Inject('ITokenRepository') private _tokenRepository: ITokenRepository,
  ) {}

  public async Create(
    user: AuthenticatedUser,
    expiresIn: DateTime = DateTime.now().plus({ day: 1 }),
  ): Promise<string | null> {
    // Getting the timestamp for the expiry date.
    const expiresInTimestamp = expiresIn.valueOf();

    const newJwtToken = await TokenService.GenerateToken(
      user,
      expiresInTimestamp,
    );

    await this._tokenRepository.AddToken(newJwtToken, {
      UserId: user.UserId,
      Username: user.Username,
      CreatedAt: Date.now(),
      ExpiryDate: expiresInTimestamp,
    });

    return newJwtToken;
  }

  private static async GenerateToken(
    user: AuthenticatedUser,
    expiresInTimestamp: number,
  ): Promise<string> {
    // For some reason I don't know, JWT library throws an error when running for the first time.
    // So, this for loop tries to re-try the process so that it always works regardless.
    for (let i = 0; i < 2; i++) {
      try {
        const payload: JWTTokenRawDataDTO = {
          UserId: user.UserId,
          Username: user.Username,
          CreatedAt: Date.now(),
          ExpiryDate: expiresInTimestamp,
        };
        const privateKey: string = await TokenService.GetPrivateKey();
        const options: jwt.SignOptions = {
          algorithm: 'RS256',
          expiresIn: expiresInTimestamp,
        };

        return jwt.sign(
          payload,
          privateKey, // Private Key loaded from jwtRS256.key file.
          options,
        );
      } catch (err) {
        console.debug(err); // debug 🤷
      }
    }
  }

  public async VerifyIntegrity(
    tokenValue: string,
  ): Promise<false | JWTTokenRawDataDTO> {
    try {
      const publicKey: string = await TokenService.GetPublicKey();
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

  public async Revoke(tokenValue: string): Promise<boolean> {
    await this._tokenRepository.RemoveToken(tokenValue);
    return true;
  }

  private static async GetPrivateKey(): Promise<string> {
    return fs.readFileSync(rootPath + '/jwtRS256.key').toString();
  }

  private static async GetPublicKey(): Promise<string> {
    return fs.readFileSync(rootPath + '/jwtRS256.key.pub').toString();
  }
}

export default TokenService;
