import { IRepositoryEntity } from './IRepositoryEntity';
import { Entity } from '../../core-domain';
import { UserProps } from '../../user/entities/User.entity';

export abstract class EntityMapper<E extends Entity<any>, R extends IRepositoryEntity> {

    abstract toOrmEntity(entity: E): R;

    abstract toDomainEntity(orm: R, skipValidation: boolean): E;

}