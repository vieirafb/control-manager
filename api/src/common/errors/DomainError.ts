import CustomError from "./CustomError";

export default class DomainError extends CustomError {
    readonly status: number = 400;

    constructor(message: string) {
        super(message);
    }

    serialize(): { message: string; data?: any[] } {
        return { message: this.message };
    }
}
