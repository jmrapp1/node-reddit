import { Injectable } from '@nestjs/common';
import { DateVO, Id } from '../../../core-domain';
import { UserRepository } from '../../repository/User.repository';
import { UserRegisterRequestDto } from './dtos/UserRegisterRequest.dto';
import { UserEntity } from '../../entities/User.entity';
import { InvalidArgumentsException } from '../../../core-exceptions';

@Injectable()
export class UserRegisterService {

    constructor(private _repository: UserRepository) {
    }

    async registerUser(userReq: UserRegisterRequestDto): Promise<void> {
        await this.validateUserUnique(userReq);
        const user = new UserEntity({
            id: Id.generateId(),
            username: userReq.username,
            password: userReq.password,
            email: userReq.email,
            firstName: userReq.firstName,
            lastName: userReq.lastName,
            createdAt: DateVO.now(),
            updatedAt: DateVO.now()
        });
        user.encryptPassword();
        await this._repository.insert(user);
    }

    async validateUserUnique(userReq: UserRegisterRequestDto) {
        const existingUser = await this._repository.findOne({
            query: {
                where: {
                    $or: [
                        { username: userReq.username },
                        { email: userReq.email },
                    ]
                }
            }
        });
        if (existingUser) {
            if (existingUser.props.username === userReq.username) {
                throw new InvalidArgumentsException('That username is already taken.');
            } else {
                throw new InvalidArgumentsException('That email is already in use.');
            }
        }
    }

}