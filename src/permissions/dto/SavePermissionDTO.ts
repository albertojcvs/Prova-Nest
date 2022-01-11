import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class SavePermissionDTO{

    @Field()
    @IsNotEmpty()
    name:string
}