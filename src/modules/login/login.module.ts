import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginResolver } from './login.resolver';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports:[AuthModule],
  providers: [LoginService, LoginResolver]
})
export class LoginModule {}
