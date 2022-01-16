import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationResponseDTO } from 'src/auth/dto/AuthenticationResponseDTO';
import { LoginUserDTO } from './dto/LoginUserDTO';
import { LoginService } from './login.service';

@Resolver()
export class LoginResolver {
  constructor(private loginService: LoginService) {}

  @Mutation(() => AuthenticationResponseDTO)
  async login(@Args('data') data: LoginUserDTO) {
    return await this.loginService.login(data);
  }
}
