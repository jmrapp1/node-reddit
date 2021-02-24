import { TestEntityMapper } from '../mappers/TestEntity.mapper';
import { TestEntity } from '../entities/Test.entity';
import { TypeOrmRepository } from '../../repository-typeorm';
import { LogBuilder } from '../../core-logging';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TestOrmEntity } from '../entities/Test.orm-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestRepository extends TypeOrmRepository<TestEntity, TestEntityMapper> {

    constructor(
        @InjectRepository(TestOrmEntity)
        repository: Repository<TestOrmEntity>) {
        super('User',
            new LogBuilder().withName('TestRepository').withColor('#0000FF').build(),
            repository, new TestEntityMapper()
        );
    }

}