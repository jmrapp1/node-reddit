import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidArgumentsException extends HttpException {

    constructor(message: string | string[]) {
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            message: Array.isArray(message) ? message : [message],
            error: 'Bad Request'
        }, HttpStatus.BAD_REQUEST);
    }

}
