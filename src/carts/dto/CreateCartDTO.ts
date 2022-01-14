import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class CreateCartDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Field()
  minValue: number;
}
