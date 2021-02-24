import { TestEntity } from './Test.entity';
import { Column, Entity } from 'typeorm';
import { TypeOrmEntity } from '../../repository-typeorm';

@Entity('Test')
export class TestOrmEntity extends TypeOrmEntity<TestEntity> {

    @Column()
    message: string;

}