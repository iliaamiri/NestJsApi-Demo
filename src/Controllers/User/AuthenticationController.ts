import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import IAuthenticationService from '../../Services/Authentication/IAuthenticationService';
import IApiCalls from '../../Services/Infrastructure/ApiCalls/IApiCalls';

import LoginPayloadDTO from '../../Models/LoginPayloadDTO';
import RegisterPayloadDTO from '../../Models/RegisterPayloadDTO';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import AuthenticatedUser from '../../Models/AuthenticatedUser';
import AuthenticationGuard from '../../Guards/AuthenticationGuard';
import StrictAuthenticationGuard from '../../Guards/StrictAuthenticationGuard';

@ApiTags('auth')
@ApiExtraModels(AuthenticatedUser)
@Controller('auth')
export default class AuthenticationController {
  constructor(
    @Inject('IAuthenticationService')
    private readonly _authenticationService: IAuthenticationService,
    @Inject('IApiCalls')
    private readonly _apiCalls: IApiCalls,
  ) {}

  @Post('/authenticate')
  @ApiResponse({ status: 403, description: 'User is NOT logged-in' })
  @UseGuards(AuthenticationGuard, StrictAuthenticationGuard)
  public async authenticate() {
    console.log('hit the /authenticate endpoint');
    return 'authenticated';
  }

  @Post('/login')
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(AuthenticatedUser),
    },
    description: 'User is logged-in.',
  })
  public async loginTrackedUser(@Body() loginPayloadDTO: LoginPayloadDTO) {
    console.log('hit the /login endpoint');

    return await this._authenticationService.LoginTrackedUser(loginPayloadDTO);
  }

  @Post('/register')
  public async register(@Body() registerPayloadDTO: RegisterPayloadDTO) {
    console.log('hit the /Register endpoint');

    return await this._authenticationService.Register(registerPayloadDTO);
  }

  @Post('/logout')
  public async logout(@Req() req: Request) {}
}
