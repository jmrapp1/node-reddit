export default class CreateTestResponseDto {

    readonly id: string;
    readonly message: string;

    constructor(id: string, message: string) {
        this.id = id;
        this.message = message;
    }
    
}
