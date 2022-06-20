import IAuthenticationService from './IAuthenticationService';
import AuthenticatedUserDTO from '../../models/AuthenticatedUserDTO';
import LoginPayloadDTO from '../../models/LoginPayloadDTO';
import RegisterPayloadDTO from '../../models/RegisterPayloadDTO';

import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';

import IApiCalls from '../Infrastructure/ApiCalls/IApiCalls';
import ITokenService from './ITokenService';
import IApiCallsExceptionHandler from '../Infrastructure/ApiCallsExceptionHandler/IApiCallsExceptionHandler';

@Injectable({ scope: Scope.REQUEST })
class AuthenticationService implements IAuthenticationService {
  constructor(
    @Inject('IApiCalls') private _apiCalls: IApiCalls,
    @Inject('ITokenService') private _tokenService: ITokenService,
    @Inject('IApiCallsExceptionHandler')
    private _apiCallsExceptionHandler: IApiCallsExceptionHandler,
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

      const response = apiResponse.data;
      console.log('Data Response: ', response);

      return Promise.resolve({} as AuthenticatedUserDTO);
    } catch (error) {
      await this._apiCallsExceptionHandler.handle(error);
    }
  }

  public async register(
    registerPayload: RegisterPayloadDTO,
  ): Promise<HttpException | RegisterPayloadDTO> {
    try {
      // Register the user and sign the JWT token.
      const apiCall = await this._apiCalls.post(
        '/Users/Auth/Register',
        registerPayload,
      );

      const statusCode = apiCall.status;

      if (statusCode === 201) {
        return registerPayload;
      }
    } catch (error) {
      await this._apiCallsExceptionHandler.handle(error);
    }
  }
}

export default AuthenticationService;
