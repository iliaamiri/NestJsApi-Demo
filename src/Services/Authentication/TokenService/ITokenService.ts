import { DateTime } from 'luxon';

import JWTTokenRawDataDTO from '../../../Models/JWTTokenRawDataDTO';
import AuthenticatedUser from '../../../Models/AuthenticatedUser';

export default interface ITokenService {
  Create(user: AuthenticatedUser, expiresIn: DateTime): Promise<string | null>;

  VerifyIntegrity(token: string): Promise<false | JWTTokenRawDataDTO>;

  Revoke(token: string): Promise<boolean>;
}
