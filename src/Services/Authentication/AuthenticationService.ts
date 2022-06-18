import IAuthenticationService from './IAuthenticationService';
import AuthenticatedUserDTO from '../../models/AuthenticatedUserDTO';
import LoginPayloadDTO from '../../models/LoginPayloadDTO';
import RegisterPayloadDTO from '../../models/RegisterPayloadDTO';

import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';

import IApiCalls from '../Infrastructure/IApiCalls';
import ITokenService from './ITokenService';

@Injectable({ scope: Scope.REQUEST })
class AuthenticationService implements IAuthenticationService {
  constructor(
    @Inject('IApiCalls') private _apiCalls: IApiCalls,
    @Inject('ITokenService') private _tokenService: ITokenService,
  ) {}

  public async authenticate(
    token: string,
  ): Promise<HttpException | AuthenticatedUserDTO> {
    return Promise.resolve({} as AuthenticatedUserDTO);
  }

  public async loginTrackedUser(
    loginPayload: LoginPayloadDTO,
  ): Promise<AuthenticatedUserDTO> {
    try {
      // Login the user and sign the JWT token.
      const apiResponse = await this._apiCalls.post(
        '/Users/Auth/Login',
        loginPayload,
      );

      console.log(apiResponse);

      return Promise.resolve({} as AuthenticatedUserDTO);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      throw new HttpException(error.message, error.status);
    }
  }

  public async register(
    registerPayload: RegisterPayloadDTO,
  ): Promise<HttpException | AuthenticatedUserDTO> {
    return Promise.resolve({} as AuthenticatedUserDTO);
  }
}

export default AuthenticationService;
