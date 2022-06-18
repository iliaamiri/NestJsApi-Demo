import { ApiProperty } from "@nestjs/swagger";

export default class UserInfoDTO {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UserId: number;

  @ApiProperty()
  Name: string;

  @ApiProperty()
  LastName: string;

  @ApiProperty()
  BirthDate: Date;

  @ApiProperty()
  PassportImage: string;

  @ApiProperty()
  SecondId: string;

  @ApiProperty()
  IsVerified: boolean;
}
