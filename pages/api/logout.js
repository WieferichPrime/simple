import cookie from 'cookie'
import User from '/Models/User'
import { SignJWT, jwtVerify } from 'jose';

export default async (req, res) => {
    if (!req.headers.cookie) throw new Error('No cookies');

    const { refresh_token } = cookie.parse(req.headers.cookie);

    if (!refresh_token) throw new Error('No refresh token');

    try {
        const {payload} = await jwtVerify(refresh_token, new TextEncoder().encode(process.env.JWT_SECRET));

        if (!payload.email || !payload.role || !payload.refresh) throw new Error('Invalid refresh token')

        const user = await User.findOne({
            where: {
            email: payload.email
            }
        });

        user.refresh_token = "";
        await user.save();

        res.setHeader('Set-Cookie',
        [
            cookie.serialize('refresh_token', '', { path: '/', sameSite: true, expires: new Date(), httpOnly: true }),
            cookie.serialize('access_token', '', { path: '/', sameSite: true, expires: new Date(), httpOnly: true })
        ]
        );
        res.status(200).json('Success logout')
    } catch (e) {
        return res.json(e)
    }
}