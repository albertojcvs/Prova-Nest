import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';

@ObjectType()
export class AuthenticationResponseDTO {
  @Field()
  user: User;

  @Field()  
  token: string;
}
