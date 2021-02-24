import { Entity } from '../../core-domain';

export class EntityEvent<E extends Entity<any>> {

    readonly entity: E;

    constructor(entity: E) {
        this.entity = entity;
    }
}