import { DateTime } from 'luxon';

import UserDTO from '../../models/UserDTO';
import JWTTokenRawDataDTO from '../../models/JWTTokenRawDataDTO';

export default interface ITokenService {
  allTokens: Map<string, any>;

  create(user: UserDTO, expiresIn: DateTime): Promise<string | null>;

  verifyIntegrity(token: string): Promise<false | JWTTokenRawDataDTO>;

  revoke(token: string): Promise<boolean>;
}
