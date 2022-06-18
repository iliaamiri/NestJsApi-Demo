import Decimal from 'decimal.js';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export default class ParseDecimalPipe
  implements PipeTransform<string, Decimal>
{
  transform(value: string, metadata: ArgumentMetadata): Decimal {
    const decimal = new Decimal(value);
    if (decimal.isNaN()) {
      throw new BadRequestException(`Invalid decimal value: ${value}`);
    }

    return decimal;
  }
}
