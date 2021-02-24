import { Entity, EntityProps } from '../../core-domain';
import { InvalidArgumentException } from '../../core-exceptions';
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
            throw new InvalidArgumentException('Please provide a valid test message');
        }
    }

}