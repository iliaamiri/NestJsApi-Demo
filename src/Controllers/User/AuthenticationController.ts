import {
  BadRequestException,
  Body,
  Controller, Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import IAuthenticationService from '../../Services/Authentication/IAuthenticationService';
import IApiCalls from '../../Services/Infrastructure/IApiCalls';

import LoginPayloadDTO from '../../Models/LoginPayloadDTO';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import AuthenticatedUserDTO from '../../Models/AuthenticatedUserDTO';

@ApiTags('auth')
@ApiExtraModels(AuthenticatedUserDTO)
@Controller('auth')
export default class AuthenticationController {
  constructor(
    @Inject('IAuthenticationService')
    private readonly _authenticationService: IAuthenticationService,
    @Inject('IApiCalls')
    private readonly _apiCalls: IApiCalls,
  ) {}

  @Post('/authenticate')
  public async authenticate(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {}

  @Post('/login')
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(AuthenticatedUserDTO),
    },
    description: 'User is logged-in.',
  })
  @ApiResponse({ status: 403, description: 'User is NOT logged-in' })
  public async loginTrackedUser(@Body() LoginPayloadDTO: LoginPayloadDTO) {
    console.log('hit the /login endpoint');
    if (!LoginPayloadDTO.Username || !LoginPayloadDTO.PasswordHashed) {
      throw new BadRequestException('Bad input');
    }

    return await this._authenticationService.loginTrackedUser(LoginPayloadDTO);
  }

  @Post('/register')
  public async register(@Req() req: Request) {}

  @Post('/logout')
  public async logout(@Req() req: Request) {}
}
