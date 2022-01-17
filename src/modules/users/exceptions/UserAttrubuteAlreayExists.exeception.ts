import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAttributeAlreadyExistsExecetion extends HttpException{
    constructor(attribute:string) {
        super({error:{message:`The attribute ${attribute} already exists!`}},HttpStatus.CONFLICT)
    }
}