import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/User.repository';
import { UserLoginRequestDto } from './dtos/UserLoginRequest.dto';
import { log } from 'util';
import { InvalidArgumentsException } from '../../../core-exceptions';

@Injectable()
export class UserLoginService {

    constructor(private _repository: UserRepository) {
    }

    async loginUser(loginReq: UserLoginRequestDto): Promise<void> {
        const user = await this._repository.findOne({
            query: {
                where: {
                    $or: [
                        { username: loginReq.username },
                        { email: loginReq.username }
                    ]
                }
            }
        });
        if (!user || !user.isPasswordEqual(loginReq.password)) {
            throw new InvalidArgumentsException('The username/email and password combination is incorrect.');
        }
    }

}