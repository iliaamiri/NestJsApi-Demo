import IAuthenticationService from './IAuthenticationService';
import AuthenticatedUserDTO from '../../models/AuthenticatedUserDTO';
import LoginPayloadDTO from '../../models/LoginPayloadDTO';
import RegisterPayloadDTO from '../../models/RegisterPayloadDTO';

import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';

import ApiCalls from '../Infrastructure/ApiCalls';
import TokenService from './TokenService';

@Injectable({ scope: Scope.REQUEST })
class AuthenticationService implements IAuthenticationService {
  constructor(
    private _apiCalls: ApiCalls,
    private _tokenService: TokenService,
  ) {}

  public async authenticate(
    token: string,
  ): Promise<HttpException | AuthenticatedUserDTO> {
    return Promise.resolve({} as AuthenticatedUserDTO);
  }

  public async loginTrackedUser(
    loginPayload: LoginPayloadDTO,
  ): Promise<HttpException | AuthenticatedUserDTO> {
    // Login the user and sign the JWT token.
    const apiResponse = await this._apiCalls.post('/Users/Login/', {});

    return Promise.resolve({} as AuthenticatedUserDTO);
  }

  public async register(
    registerPayload: RegisterPayloadDTO,
  ): Promise<HttpException | AuthenticatedUserDTO> {
    return Promise.resolve({} as AuthenticatedUserDTO);
  }
}

export default AuthenticationService;
