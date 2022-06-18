import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// Controllers
import AuthenticationController from './Controllers/User/AuthenticationController';

// Providers
import AuthenticationService from './Services/Authentication/AuthenticationService';
import TokenService from './Services/Authentication/TokenService';
import AxiosApiCalls from './Services/Infrastructure/AxiosApiCalls';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthenticationController],
  providers: [
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
