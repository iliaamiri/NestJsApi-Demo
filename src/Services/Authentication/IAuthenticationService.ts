import AuthenticatedUser from '../../Models/AuthenticatedUser';
import LoginPayloadDTO from '../../models/LoginPayloadDTO';
import RegisterPayloadDTO from '../../models/RegisterPayloadDTO';

import { HttpException } from '@nestjs/common';

export default interface IAuthenticationService {
  Authenticate(token: string): Promise<HttpException | AuthenticatedUser>;

  LoginTrackedUser(loginPayload: LoginPayloadDTO): Promise<AuthenticatedUser>;

  Register(
    registerPayload: RegisterPayloadDTO,
  ): Promise<HttpException | RegisterPayloadDTO>;
}
