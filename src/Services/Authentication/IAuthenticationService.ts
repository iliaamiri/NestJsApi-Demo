import AuthenticatedUserDTO from '../../models/AuthenticatedUserDTO';
import LoginPayloadDTO from '../../models/LoginPayloadDTO';
import RegisterPayloadDTO from '../../models/RegisterPayloadDTO';

import { HttpException } from '@nestjs/common';

export default interface IAuthenticationService {
  authenticate(token: string): Promise<HttpException | AuthenticatedUserDTO>;

  loginTrackedUser(
    loginPayload: LoginPayloadDTO,
  ): Promise<AuthenticatedUserDTO>;

  register(
    registerPayload: RegisterPayloadDTO,
  ): Promise<HttpException | AuthenticatedUserDTO>;
}
