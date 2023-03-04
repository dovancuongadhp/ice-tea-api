import { Response } from "express";
export function setTokenCookie(res : Response, token:any)
{
    // create http only cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refresh_token', token, cookieOptions);
}