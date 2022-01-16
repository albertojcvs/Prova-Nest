import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsSemVer, IsString } from 'class-validator';

@InputType()
export class LoginUserDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
