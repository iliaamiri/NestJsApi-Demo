import IApiCallsExceptionHandler from './IApiCallsExceptionHandler';
import { HttpException } from '@nestjs/common';

export default class AxiosApiCallsExceptionHandler
  implements IApiCallsExceptionHandler
{
  public async handle(error: any): Promise<HttpException | void> {
    if (error.response && error.response.data) {
      const errorJSON = error.response.data;
      throw new HttpException(errorJSON, errorJSON.statusCode);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Internal Server Error',
        },
        500,
      );
    }
    console.log(`Unexpected Error: `, error);
    console.log(error.config);
  }
}
