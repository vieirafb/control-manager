import {NextFunction, Request, Response} from 'express';

export default function ExpressAdapter(fn: Function) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const obj = await fn(req.params, req.body);
        if (obj.error) return next(obj.error);
        return res.status(obj.status).json(obj.response);
    }
}
