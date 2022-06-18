import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import AuthenticationService from '../../Services/Authentication/AuthenticationService';
import ApiCalls from '../../Services/Infrastructure/ApiCalls';

import LoginPayloadDTO from '../../Models/LoginPayloadDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export default class AuthenticationController {
  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _apiCalls: ApiCalls,
  ) {}

  @Post('/authenticate')
  public async authenticate(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {}

  @Post('/login')
  public async loginTrackedUser(@Body() LoginPayloadDTO: LoginPayloadDTO) {
    if (!LoginPayloadDTO.Username || !LoginPayloadDTO.PasswordHashed) {
      throw new BadRequestException('Bad input');
    }

    const loginTrackedUser_Result =
      await this._authenticationService.loginTrackedUser(LoginPayloadDTO);
  }

  @Post('/register')
  public async register(@Req() req: Request) {}

  @Post('/logout')
  public async logout(@Req() req: Request) {}
}
