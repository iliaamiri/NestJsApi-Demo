import UserInfoDTO from './UserInfoDTO';
import RoleDTO from './RoleDTO';
import { ApiProperty } from '@nestjs/swagger';

export default class UserDTO {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  Username: string;

  @ApiProperty()
  NormalizedUserName: string;

  @ApiProperty({ required: false })
  Email?: string;

  @ApiProperty({ required: false })
  NormalizedEmail?: string;

  @ApiProperty()
  EmailConfirmed: boolean;

  @ApiProperty()
  PasswordHash: string;

  @ApiProperty()
  Salt: string;

  @ApiProperty({
    required: false,
    description: `User's phone number. (optional)`,
    example: '+1 (123) 456-7890',
  })
  PhoneNumber?: string;

  @ApiProperty({
    description: 'Phone number confirmation status',
    example: true,
  })
  PhoneNumberConfirmed: boolean;

  @ApiProperty({
    description: `Is two factor enabled for this user?`,
    example: false,
  })
  TwoFactorEnabled: boolean;

  @ApiProperty({
    required: false,
    description: `The time when lockout ends, any time in the past is considered not locked out.`,
    example: ['2020-01-01T00:00:00.000Z'],
  })
  LockoutEnd?: Date;

  @ApiProperty({
    description: `The number of failed login attempts for the user. This property is not used, if lockout is disabled.`,
    example: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  })
  AccessFailedCount: number;

  @ApiProperty({
    description: `Level of the user.`,
    example: [1, 2, 7, 8, 10, 15, 20, 24, 37, 49, 100],
  })
  UserLevel: number;

  @ApiProperty()
  UserInfoDTO: UserInfoDTO;

  @ApiProperty()
  Role: RoleDTO;
}
