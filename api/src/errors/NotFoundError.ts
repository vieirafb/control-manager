import CustomError from "./CustomError";

export default class NotFoundError extends CustomError {
    readonly status: number = 404;

    constructor(message: string) {
        super(message);
    }

    serialize(): { message: string; data?: any[] } {
        return {message: this.message};
    }
}
