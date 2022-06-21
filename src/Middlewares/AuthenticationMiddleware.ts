import {
  HttpException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import ITokenRepository from '../Services/Authentication/TokenRepository/ITokenRepository';
import ITokenService from '../Services/Authentication/TokenService/ITokenService';
import JWTTokenRawDataDTO from '../Models/JWTTokenRawDataDTO';

@Injectable()
export default class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @Inject('ITokenRepository')
    private readonly _tokenRepository: ITokenRepository,
    @Inject('ITokenService')
    private readonly _tokenService: ITokenService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new HttpException('Unauthorized', 403);
    }
    const JWTToken = authorizationHeader.split(' ')[1];
    let user: JWTTokenRawDataDTO | false;
    user = await this._tokenRepository.GetToken(JWTToken);

    if (!user) {
      user = await this._tokenService.VerifyIntegrity(JWTToken);

      if (!user) {
        throw new HttpException('Unauthorized', 403);
      }
    }

    req['user'] = user;

    next();
  }
}
