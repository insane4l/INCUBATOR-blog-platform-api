import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../core/constants/http-status.constants.js';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../settings/config.js';

export const superAdminGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string; // 'Basic <Base64 string>'
    if (!auth) {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
        return;
    }

    const [authType, token] = auth.split(' '); // admin:qwerty
    if (authType !== 'Basic') {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
        return;
    }

    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
        return;
    }

    next(); // Successful authorization, go to the next handler
};
