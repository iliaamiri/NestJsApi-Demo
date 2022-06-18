import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// Controllers
import AuthenticationController from './Controllers/User/AuthenticationController';

// Providers
import AuthenticationService from './Services/Authentication/AuthenticationService';
import TokenService from './Services/Authentication/TokenService';
import NeedleApiCalls from './Services/Infrastructure/NeedleApiCalls';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: 'IApiCalls',
      useClass: NeedleApiCalls,
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
