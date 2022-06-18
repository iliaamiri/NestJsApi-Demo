import { ApiProperty } from '@nestjs/swagger';

export default class AuthenticatedUserDTO {
  // JWT token as a string
  @ApiProperty()
  JWT: string;

  @ApiProperty()
  UserId: number;

  @ApiProperty()
  Username: string;

  @ApiProperty()
  RealMoneyMode: boolean;

  // TODO: Money Data-Type
  @ApiProperty()
  CurrentBalance: string;
}
