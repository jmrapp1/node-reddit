import { CreateDateColumn, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Entity } from '../core-domain';
import { IRepositoryEntity } from '../core-repository';

export abstract class TypeOrmEntity<E extends Entity<any>> implements IRepositoryEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @CreateDateColumn({ update: false })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}