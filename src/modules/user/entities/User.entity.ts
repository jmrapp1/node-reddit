import * as bcrypt from 'bcryptjs';
import { Entity, EntityProps } from '../../core-domain';
import { InvalidArgumentsException } from '../../core-exceptions';
import { isEmail, isEmpty, minLength } from '../../core-guards';

export interface UserProps extends EntityProps {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export class UserEntity extends Entity<UserProps> {

    constructor(props: UserProps, skipValidation = false) {
        super(props, skipValidation);
    }

    validateProps(props: UserProps): void {
        if (isEmpty(props.username) || !minLength(props.username, 4) || props.username.indexOf(' ') > 0) {
            throw new InvalidArgumentsException('Please provide a valid username');
        } else if (isEmpty(props.password) || !minLength(props.password, 6)) {
            throw new InvalidArgumentsException('Please provide a valid password');
        } else if (!isEmail(props.email)) {
            throw new InvalidArgumentsException('Please provide a valid email');
        } else if (isEmpty(props.firstName)) {
            throw new InvalidArgumentsException('Please provide a valid first name');
        } else if (isEmpty(props.lastName)) {
            throw new InvalidArgumentsException('Please provide a valid last name');
        }
    }

    isPasswordEqual(otherPassword: string) {
        return bcrypt.compareSync(otherPassword, this.props.password);
    }

    encryptPassword() {
        this.props.password = this.hashPassword(this.props.password);
    }

    private hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

}