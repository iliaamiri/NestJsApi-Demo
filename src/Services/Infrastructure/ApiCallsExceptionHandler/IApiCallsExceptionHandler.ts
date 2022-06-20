import { HttpException } from '@nestjs/common';

export default interface IApiCallsExceptionHandler {
  handle(error: any): Promise<HttpException | void>;
}
