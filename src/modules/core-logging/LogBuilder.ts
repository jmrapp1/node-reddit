import { Logger } from './Logger';

export class LogBuilder {

    protected _name: string;
    protected _color: string;

    withName(name: string): LogBuilder {
        this._name = name;
        return this;
    }

    withColor(color: string): LogBuilder {
        this._color = color;
        return this;
    }

    build() {
        return new Logger(this._name, this._color);
    }

}