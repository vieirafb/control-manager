import {Request, Response} from 'express';

export default function ExpressAdapter(fn: Function) {
    return async function (req: Request, res: Response) {
        const obj = await fn(req.params, req.body);
        return res.status(obj.status).json(obj.response);
    }
}
