import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class RegisterPayloadDTO {
  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsNotEmpty()
  Username: string;

  @IsNotEmpty()
  @ApiProperty()
  PasswordHashed: string;
}
