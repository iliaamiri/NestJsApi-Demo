import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class LoginPayloadDTO {
  @ApiProperty()
  @IsNotEmpty()
  Username: string;

  @ApiProperty()
  @IsNotEmpty()
  PasswordHashed: string;
}
