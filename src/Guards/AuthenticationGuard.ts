import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import JWTTokenRawDataDTO from '../Models/JWTTokenRawDataDTO';
import ITokenRepository from '../Services/Authentication/TokenRepository/ITokenRepository';
import ITokenService from '../Services/Authentication/TokenService/ITokenService';

@Injectable()
export default class AuthenticationGuard implements CanActivate {
  constructor(
    @Inject('ITokenRepository')
    private readonly _tokenRepository: ITokenRepository,
    @Inject('ITokenService')
    private readonly _tokenService: ITokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  public async validateRequest(request: Request): Promise<boolean> {
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      return false;
    }

    const JWTToken = authorizationHeader.split(' ')[1];
    let user: JWTTokenRawDataDTO | false;
    user = await this._tokenRepository.GetToken(JWTToken);

    if (!user) {
      user = await this._tokenService.VerifyIntegrity(JWTToken);
      if (!user) {
        return false;
      }
    }

    request['user'] = user;
    return true;
  }
}
