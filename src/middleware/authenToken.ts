import * as process from 'process';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request,Response } from 'express';
import { HTTP_CODE } from '../types/HttpCode';
export function authenToken(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers['authorization'];
  // Bearer [Token]
  if(!authorizationHeader) return res.sendStatus(HTTP_CODE.UNAUTHORIZED)
  const token = authorizationHeader.split(' ')[1];
  if (!token) return res.sendStatus(HTTP_CODE.UNAUTHORIZED);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, data: any) => {
    if (err) return res.sendStatus(HTTP_CODE.FORBIDDEN);
    (req as any).uid = data.uid;
    next();
  });
}
