import { Entity, EntityProps } from '../../core-domain';
import { InvalidArgumentsException } from '../../core-exceptions';
import { isEmpty } from '../../core-guards';

export interface TestProps extends EntityProps {
    message: string;
}

export class TestEntity extends Entity<TestProps> {

    constructor(props: TestProps) {
        super(props);
    }

    public validateProps(props: TestProps): void {
        if (isEmpty(props.message)) {
            throw new InvalidArgumentsException('Please provide a valid test message');
        }
    }

}