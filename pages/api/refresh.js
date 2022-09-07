import cookie from 'cookie'
import User from '/Models/User'
import { SignJWT, jwtVerify } from 'jose';
import { NextResponse, NextRequest } from 'next/server';

export default async (req, res) => {
    const { refresh_token } = req.cookies || '';
    if (!refresh_token) throw Error('No refresh token');

    const {payload} = await jwtVerify(refresh_token, new TextEncoder().encode(process.env.JWT_SECRET));

    if (!payload.email || !payload.role || !payload.refresh) throw new Error('Invalid refresh token')

    const user = await User.findOne({
        where: {
          email: payload.email
        }
    });

    if (user.refresh_token !== refresh_token) throw new Error('Refresh token expired');

    const new_access_token = await new SignJWT({ email: user.email, role: user.role, access: true})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime('15min')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const new_refresh_token = await new SignJWT({ email: user.email, role: user.role, refresh: true})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime('30d')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    user.refresh_token = new_refresh_token;
    await user.save();

    res.setHeader('Set-Cookie', 
    [
        serialize('refresh_token', new_refresh_token, { path: '/', sameSite: true, httpOnly: true, }),
        serialize('access_token', new_access_token, { path: '/', sameSite: true, httpOnly: true, }),
    ]
    );
    res.status(200);
}