import { TestOrmEntity } from '../entities/Test.orm-entity';
import { TestEntity } from '../entities/Test.entity';
import { EntityMapper } from '../../core-repository';
import { DateVO, Id } from '../../core-domain/valueObject';
import { ObjectID } from 'mongodb';

export class TestEntityMapper extends EntityMapper<TestEntity, TestOrmEntity> {

    toOrmEntity(entity: TestEntity): TestOrmEntity {
        const ormEntity = new TestOrmEntity();
        ormEntity.id = new ObjectID(entity.props.id.value);
        ormEntity.message = entity.props.message;
        ormEntity.createdAt = entity.props.createdAt.value;
        ormEntity.updatedAt = entity.props.updatedAt.value;
        return ormEntity;
    }

    toDomainEntity(orm: TestOrmEntity): TestEntity {
        return new TestEntity({
            id: new Id(orm.id.toString()),
            message: orm.message,
            createdAt: new DateVO(orm.createdAt),
            updatedAt: new DateVO(orm.updatedAt)
        })
    }

}