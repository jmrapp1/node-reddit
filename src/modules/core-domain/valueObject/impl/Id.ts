import { v4 as uuid } from 'uuid';
import { ValueObject } from '../ValueObject';
import { ObjectID } from 'mongodb';

export class Id extends ValueObject<string> {

    constructor(value: string) {
        super(value);
    }

    isEqualTo(value: ValueObject<string>): boolean {
        return value.value === this._value;
    }

    protected validate(value: string): void {
        if (typeof value === 'undefined' || value === null || value.length === 0) {
            throw new Error('Please provide a valid ID value.');
        }
    }

    static generateId(): Id {
        return new Id(new ObjectID().toString());
    }

}