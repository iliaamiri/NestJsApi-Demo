import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// Controllers
import AuthenticationController from './Controllers/User/AuthenticationController';

// Providers
import ApiCalls from './Services/Infrastructure/ApiCalls';
import AuthenticationService from './Services/Authentication/AuthenticationService';
import TokenService from './Services/Authentication/TokenService';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthenticationController],
  providers: [ApiCalls, TokenService, AuthenticationService],
})
export class AppModule {}
