import { HttpException } from '@nestjs/common';

export default interface IApiCallsExceptionHandler {
  Handle(
    error: any,
    customErrorObjectCallback?: any,
  ): Promise<HttpException | void>;
}
