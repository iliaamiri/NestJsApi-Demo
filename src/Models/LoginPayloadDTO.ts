import { ApiProperty } from '@nestjs/swagger';

export default class LoginPayloadDTO {
  @ApiProperty()
  Username: string;

  @ApiProperty()
  PasswordHashed: string;
}
