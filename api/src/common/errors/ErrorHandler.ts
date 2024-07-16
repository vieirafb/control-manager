import { CelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";
import CustomError from "./CustomError";

export default (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    if (error instanceof CustomError) return response.status(error.status).json(error.serialize());

    if (error instanceof CelebrateError) {
        const messages: string[] = [];

        error.details.forEach(details =>
            details.details.forEach(detail => messages.push(detail.message))
        );

        return response.status(400).json({
            message: error.message,
            data: messages
        });
    }

    return response.status(500).json({
        message: error.message,
    });
};
