import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserRegisterService } from './UserRegister.service';
import { UserRegisterRequestDto } from './dtos/UserRegisterRequest.dto';

@Controller('user')
export class UserRegisterController {

    constructor(private registerService: UserRegisterService) {
    }

    @Post()
    @HttpCode(201)
    async registerUser(@Body() regReq: UserRegisterRequestDto): Promise<any> {
        await this.registerService.registerUser(regReq);
    }

}