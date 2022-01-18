import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateGameDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  type?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: true })
  price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  color?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: true })
  range?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: true })
  maxNumber?: number;
}
