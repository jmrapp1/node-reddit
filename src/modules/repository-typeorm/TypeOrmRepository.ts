import { TypeOrmEntity } from './TypeOrmEntity';
import { FindManyOptions, Repository } from 'typeorm';
import { DomainRepository, EntityMapper, QueryInterface } from '../core-repository';
import { Entity } from '../core-domain';
import { Logger } from '../core-logging';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EntityEvent } from './events/EntityEvent';

export interface TypeOrmQueryInterface<E extends TypeOrmEntity<any>> extends QueryInterface {
    query: FindManyOptions<E>;
}

export abstract class TypeOrmRepository<E extends Entity<any>, M extends EntityMapper<E, TypeOrmEntity<E>>> implements DomainRepository<E, M> {

    protected _entityName: string;
    protected _logger: Logger;
    protected _repository: Repository<TypeOrmEntity<E>>;
    protected _entityMapper: M;

    @Inject()
    private _eventEmitter: EventEmitter2;

    constructor(entityName: string, logger: Logger, repository: Repository<TypeOrmEntity<E>>, entityMapper: M) {
        this._entityName = entityName;
        this._logger = logger;
        this._repository = repository;
        this._entityMapper = entityMapper;
    }

    async find(query: TypeOrmQueryInterface<TypeOrmEntity<E>>): Promise<E[]> {
        const res = await this._repository.find(query.query);
        return res.map(this._entityMapper.toDomainEntity);
    }

    async findById(id): Promise<E | undefined> {
        const res = await this._repository.findByIds(id);
        if (res.length === 0) return undefined;
        if (res.length > 1) {
            this._logger.error(`More than one '${this._repository.metadata.name}' entity found with same ID '${id}'`);
            throw new InternalServerErrorException();
        }
        return this._entityMapper.toDomainEntity(res[0]);
    }

    async insert(entity: E): Promise<E> {
        const orm = this._entityMapper.toOrmEntity(entity);
        const res = await this._repository.save(orm);
        const domain = this._entityMapper.toDomainEntity(res);
        this._eventEmitter.emit(`${this._entityName}.created`, new EntityEvent<E>(entity));
        return domain;
    }

    async save(entity: E): Promise<E> {
        const orm = this._entityMapper.toOrmEntity(entity);
        const res = await this._repository.save(orm);
        const domain = this._entityMapper.toDomainEntity(res);
        this._eventEmitter.emit(`${this._entityName}.updated`, new EntityEvent<E>(entity));
        return domain;
    }

    count(query: any): Promise<number> {
        return this._repository.count(query.query);
    }

    async delete(entity: E): Promise<void> {
        const orm = this._entityMapper.toOrmEntity(entity);
        await this._repository.remove(orm);
        this._eventEmitter.emit(`${this._entityName}.deleted`, new EntityEvent<E>(entity));
    }

}