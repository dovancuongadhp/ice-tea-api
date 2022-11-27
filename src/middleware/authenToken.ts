import * as jwt from 'jsonwebtoken';
export function authenToken(req: any, res: any, next: any) {
  const authorizationHeader = req.headers['authorization'];
  // Bearer [Token]
  const token = authorizationHeader.split(' ')[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, data: any) => {
    if (err) res.sendStatus(403);
    next();
  });
}