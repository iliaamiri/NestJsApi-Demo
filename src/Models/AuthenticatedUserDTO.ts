import { ApiProperty } from '@nestjs/swagger';
import Decimal from 'decimal.js';
import { IsDecimal } from 'class-validator';

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

  @ApiProperty({
    type: 'string',
    format: 'decimal',
  })
  @IsDecimal({ force_decimal: true })
  CurrentRealMoneyBalance: string;

  @ApiProperty({
    type: 'string',
    format: 'decimal',
  })
  @IsDecimal({ force_decimal: true })
  CurrentPlayMoneyBalance: string;
}
