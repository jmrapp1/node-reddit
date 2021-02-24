import { DateVO, Id } from '../valueObject';

export interface EntityProps {
    readonly id: Id;
    readonly createdAt: DateVO;
    updatedAt: DateVO;
}

export abstract class Entity<Props extends EntityProps> {

    private readonly _props: Props;

    constructor(props: Props) {
        this.validateDefined(props);
        this.validateProps(props);
        this._props = props;
    }

    protected validateDefined(props: Props): void {
        if (typeof props === 'undefined' || props === null) {
            throw new Error('Entity props not provided.');
        }
    }

    public abstract validateProps(props: Props): void;

    get props(): Props {
        return this._props;
    }
}