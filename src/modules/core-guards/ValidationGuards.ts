import * as emailValidator from 'email-validator';

export function isEmpty(obj): boolean {
    if (typeof obj === 'undefined' || obj === null) {
        return true;
    }
    if (typeof obj === 'string' && obj.length === 0) {
        return true;
    }
    if (typeof obj === 'object' && Object.keys(obj).length === 0) {
        return true;
    }
    if (Array.isArray(obj) && obj.length === 0) {
        return true;
    }
    return false;
}

export function minLength(str: string, length: number) {
    return str?.length >= length;
}

export function isEmail(email: string) {
    if (isEmpty(email)) {
        return false;
    }
    return emailValidator.validate(email);
}