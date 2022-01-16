import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
class BetDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  numbers: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  gameId: string;
}

@InputType()
export class CreateBetDTO {
  @Field(() => [BetDTO])
  @IsArray()
  bets: BetDTO[];
}
