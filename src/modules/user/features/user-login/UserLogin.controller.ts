import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserLoginService } from './UserLogin.service';
import { UserLoginRequestDto } from './dtos/UserLoginRequest.dto';

@Controller('user')
export class UserLoginController {

    constructor(private _userLoginService: UserLoginService) {
    }

    @Post('/auth')
    @HttpCode(201)
    async registerUser(@Body() loginReq: UserLoginRequestDto) {
        return this._userLoginService.loginUser(loginReq);
    }

}