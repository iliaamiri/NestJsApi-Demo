import IAuthenticationService from './IAuthenticationService';
import AuthenticatedUser from '../../Models/AuthenticatedUser';
import LoginPayloadDTO from '../../models/LoginPayloadDTO';
import RegisterPayloadDTO from '../../models/RegisterPayloadDTO';

import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';

import IApiCalls from '../Infrastructure/ApiCalls/IApiCalls';
import ITokenService from './TokenService/ITokenService';
import IApiCallsExceptionHandler from '../Infrastructure/ApiCallsExceptionHandler/IApiCallsExceptionHandler';
import ErrorMessage from '../../Models/ErrorMessage';
import { DateTime } from 'luxon';

@Injectable({ scope: Scope.REQUEST })
class AuthenticationService implements IAuthenticationService {
  constructor(
    @Inject('IApiCalls') private _apiCalls: IApiCalls,
    @Inject('ITokenService') private _tokenService: ITokenService,
    @Inject('IApiCallsExceptionHandler')
    private _apiCallsExceptionHandler: IApiCallsExceptionHandler,
  ) {}

  public async Authenticate(
    token: string,
  ): Promise<HttpException | AuthenticatedUser> {
    return Promise.resolve({} as AuthenticatedUser);
  }

  public async LoginTrackedUser(
    loginPayload: LoginPayloadDTO,
  ): Promise<AuthenticatedUser> {
    try {
      // Login the user and sign the JWT token.
      const apiResponse = await this._apiCalls.post(
        '/Users/Auth/Login',
        loginPayload,
      );

      // App backend is putting full trust on the structure of the response.
      const authenticatedUser = apiResponse.data;

      authenticatedUser.JWT = await this._tokenService.Create(
        {
          UserId: authenticatedUser.userId,
          Username: authenticatedUser.username,
          RealMoneyMode: authenticatedUser.realMoneyMode,
          CurrentRealMoneyBalance: authenticatedUser.currentRealMoneyBalance,
          CurrentPlayMoneyBalance: authenticatedUser.currentPlayMoneyBalance,
        } as AuthenticatedUser,
        DateTime.now().plus({ days: 1 }),
      );

      console.log(authenticatedUser);

      return authenticatedUser;
    } catch (error) {
      await this._apiCallsExceptionHandler.Handle(
        error,
        (errorJSON: ErrorMessage) => {
          console.log('Login | Error JSON: ', errorJSON);
          return {
            statusCode: errorJSON.statusCode,
            message: 'Invalid credentials',
          };
        },
      );
    }
  }

  public async Register(
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
      await this._apiCallsExceptionHandler.Handle(error);
    }
  }
}

export default AuthenticationService;
