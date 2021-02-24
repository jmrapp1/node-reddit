import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/User.repository';
import { UserLoginRequestDto } from './dtos/UserLoginRequest.dto';

@Injectable()
export class UserLoginService {

    constructor(private _repository: UserRepository) {
    }

    async loginUser(loginReq: UserLoginRequestDto): Promise<void> {

    }

}