import { ApiProperty } from '@nestjs/swagger';

export default class RegisterPayloadDTO {
  @ApiProperty()
  Email: string;

  @ApiProperty()
  Username: string;

  @ApiProperty()
  PasswordHashed: string;
}
