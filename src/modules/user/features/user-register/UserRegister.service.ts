import { Injectable } from '@nestjs/common';
import { DateVO, Id } from '../../../core-domain';
import { UserRepository } from '../../repository/User.repository';
import { UserRegisterRequestDto } from './dtos/UserRegisterRequest.dto';
import { UserEntity } from '../../entities/User.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { EntityEvent } from '../../../repository-typeorm';

@Injectable()
export class UserRegisterService {

    constructor(private _repository: UserRepository) {
    }

    async registerUser(userReq: UserRegisterRequestDto): Promise<void> {
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

    @OnEvent('User.created')
    onCreated(user: EntityEvent<UserEntity>) {
        console.log('User: ' + JSON.stringify(user));
    }

}