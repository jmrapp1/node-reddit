import { TypeOrmRepository } from '../../repository-typeorm';
import { LogBuilder } from '../../core-logging';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserOrmEntity } from '../entities/User.orm-entity';
import { UserEntityMapper } from '../mappers/UserEntity.mapper';
import { UserEntity } from '../entities/User.entity';

@Injectable()
export class UserRepository extends TypeOrmRepository<UserEntity, UserEntityMapper> {

    constructor(
        @InjectRepository(UserOrmEntity)
        repository: MongoRepository<UserOrmEntity>) {
        super('User',
            new LogBuilder().withName('UserRepository').withColor('#00C2D1').build(),
            repository, new UserEntityMapper()
        );
    }

}