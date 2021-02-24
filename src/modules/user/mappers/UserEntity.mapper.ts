import { EntityMapper } from '../../core-repository';
import { DateVO, Id } from '../../core-domain/valueObject';
import { ObjectID } from 'mongodb';
import { UserEntity } from '../entities/User.entity';
import { UserOrmEntity } from '../entities/User.orm-entity';

export class UserEntityMapper extends EntityMapper<UserEntity, UserOrmEntity> {

    toOrmEntity(entity: UserEntity): UserOrmEntity {
        const ormEntity = new UserOrmEntity();
        ormEntity.id = new ObjectID(entity.props.id.value);
        ormEntity.username = entity.props.username;
        ormEntity.password = entity.props.password;
        ormEntity.email = entity.props.email;
        ormEntity.firstName = entity.props.firstName;
        ormEntity.lastName = entity.props.lastName;
        ormEntity.createdAt = entity.props.createdAt.value;
        ormEntity.updatedAt = entity.props.updatedAt.value;
        return ormEntity;
    }

    toDomainEntity(orm: UserOrmEntity, skipValidation = false): UserEntity {
        return new UserEntity({
            id: new Id(orm.id.toString()),
            username: orm.username,
            password: orm.password,
            email: orm.email,
            firstName: orm.firstName,
            lastName: orm.lastName,
            createdAt: new DateVO(orm.createdAt),
            updatedAt: new DateVO(orm.updatedAt)
        }, skipValidation)
    }

}