import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match, ToLower } from '../../../../core-guards';

export class UserRegisterRequestDto {

    @ToLower()
    @MinLength(4, { message: 'The username is too short.' })
    username: string;

    @MinLength(6, { message: 'The password is too short.' })
    password: string;

    @MinLength(6, { message: 'The confirmed password is too short.' })
    @Match('password', { message: 'The passwords do not match.' })
    confirmPassword: string;

    @ToLower()
    @IsEmail({ }, { message: 'The email is invalid.'})
    email: string;

    @MinLength(2, { message: 'The first name is too short.' })
    firstName: string;

    @MinLength(2, { message: 'The last name is too short.' })
    lastName: string;

}