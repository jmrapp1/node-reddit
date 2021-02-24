const chalk = require('chalk');

export const INFO_COLOR = '#89cff0';
export const WARN_COLOR = '#ff9100';
export const ERROR_COLOR = '#ff6961';
export const CRITICAL_COLOR = '#FF0000';

export class Logger {

    private readonly _name: string;
    private readonly _color: string;

    constructor(name: string, color: string) {
        this._name = name;
        this._color = color;
    }

    info(msg) {
        console.log(chalk.hex(INFO_COLOR)(`[INFO]`)
            + chalk.hex(this._color)(`[${this._name}] `)
            + msg);
    }

    warn(msg) {
        console.warn(chalk.hex(WARN_COLOR)(`[WARN]`)
            + chalk.hex(this._color)(`[${this._name}] `)
            + chalk.hex(WARN_COLOR)(msg));
    }

    error(msg) {
        console.error(chalk.hex(ERROR_COLOR)(`[ERROR]`)
            + chalk.hex(this._color)(`[${this._name}] `)
            + chalk.hex(ERROR_COLOR)(msg));
    }

    critical(msg) {
        console.error(chalk.hex(CRITICAL_COLOR)(`[CRITICAL]`)
            + chalk.hex(this._color)(`[${this._name}] `)
            + chalk.hex(CRITICAL_COLOR)(msg));
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }
}