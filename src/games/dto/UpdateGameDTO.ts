import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateGameDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field()
  type: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field()
  color: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field()
  range: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field()
  maxNumber: number;
}
