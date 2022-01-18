import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SaveUserDTO{
    
    @Field()
    @IsNotEmpty()
    username:string
    
    @Field()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

    @Field()
    @IsNotEmpty()
    @IsString()
    password:string

}