import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGameDTO {
  
  @IsNotEmpty()
  @IsString()
  @Field()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  range: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  maxNumber: number;
}
