import { Response, NextFunction } from 'express';
import { IRequest } from "../utils/interfaces";
import jwt from '../utils/jwt';

class CheckTokenMiddleware {

    checkToken(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.headers
            if (!token) {
                throw new Error('token required')
            }
            const adminId = jwt.verify(token);
            // @ts-ignore
            req.adminId = adminId;

            next()
        } catch (error) {
            return next(error)
        }
    }
}

export default CheckTokenMiddleware;