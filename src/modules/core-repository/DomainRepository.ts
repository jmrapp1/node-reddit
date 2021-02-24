import { EntityMapper } from './entity/EntityMapper';
import { IRepositoryEntity } from './entity/IRepositoryEntity';
import { Entity, Id } from '../core-domain';

export interface QueryInterface {}

export interface DomainRepository<E extends Entity<any>, M extends EntityMapper<E, IRepositoryEntity>> {

    insert(entity: E): Promise<E>;
    save(entity: E): Promise<E>;
    findById(id: Id): Promise<E>;
    find(query: QueryInterface): Promise<E[]>;
    count(query: QueryInterface): Promise<number>;
    delete(entity: E): Promise<void>;

}