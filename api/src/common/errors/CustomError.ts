export default abstract class CustomError extends Error {
    abstract status: number;

    constructor(message: string) {
        super(message);
    }

    abstract serialize(): { message: string, data?: any[] };
}
