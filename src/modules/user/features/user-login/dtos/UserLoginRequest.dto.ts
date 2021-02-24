import { ToLower } from '../../../../core-guards';
import { MinLength } from 'class-validator';

export class UserLoginRequestDto {

    @ToLower()
    @MinLength(4, { message: 'The username is too short.' })
    username: string;

    @MinLength(6, { message: 'The password is incorrect.' })
    password: string;
}