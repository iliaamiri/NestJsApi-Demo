import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// Controllers
import AuthenticationController from './Controllers/User/AuthenticationController';

// Providers
import AuthenticationService from './Services/Authentication/AuthenticationService';
import TokenService from './Services/Authentication/TokenService/TokenService';
import AxiosApiCalls from './Services/Infrastructure/ApiCalls/AxiosApiCalls';
import AxiosApiCallsExceptionHandler from './Services/Infrastructure/ApiCallsExceptionHandler/AxiosApiCallsExceptionHandler';
import TokenRepository from './Services/Authentication/TokenRepository/TokenRepository';
import AuthenticationMiddleware from './Middlewares/AuthenticationMiddleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: 'IApiCallsExceptionHandler',
      useClass: AxiosApiCallsExceptionHandler,
    },
    {
      provide: 'ITokenRepository',
      useClass: TokenRepository,
    },
    {
      provide: 'IApiCalls',
      useClass: AxiosApiCalls,
    },
    {
      provide: 'ITokenService',
      useClass: TokenService,
    },
    {
      provide: 'IAuthenticationService',
      useClass: AuthenticationService,
    },
  ],
})
export class AppModule {}

// FOR MIDDLEWARES
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthenticationMiddleware)
//       .exclude(
//         { path: `(.*)/login`, method: RequestMethod.POST },
//         { path: `(.*)/register`, method: RequestMethod.POST },
//       )
//       .forRoutes(AuthenticationController);
//   }
// }
