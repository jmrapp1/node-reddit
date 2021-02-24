import { Column, Entity } from 'typeorm';
import { TypeOrmEntity } from '../../repository-typeorm';
import { UserEntity } from './User.entity';

@Entity('User')
export class UserOrmEntity extends TypeOrmEntity<UserEntity> {

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}