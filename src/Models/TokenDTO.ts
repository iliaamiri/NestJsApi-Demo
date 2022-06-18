import { ApiProperty } from '@nestjs/swagger';

export default class TokenDTO {
  @ApiProperty()
  UserId: number;

  @ApiProperty()
  JWTTokenValue: string;

  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  ExpiryDate: number;
}
