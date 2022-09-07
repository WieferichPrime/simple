// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';
import {verify} from './Services/jwt_sign_verify';
import {jwtDecrypt, jwtVerify, decodeJwt} from 'jose';
import cookie from 'cookie'
import refresh from './pages/api/refresh.js';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const response = NextResponse.next();
    // await fetch('http://localhost:3000/api/refresh', {
    //     headers: {
    //         'Cookie': cookie.serialize('refresh_token', request.cookies.get('refresh_token'), { path: '/', sameSite: true }) 
    //     }
    // })
    // .catch(e => console.log(e))
    //.then( res => console.log(res.text()) )
    //.then( ({access_token}) => res.setHeader('authorization', 'Bearer ' + access_token) )
    
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const access_token = request.cookies.get('access_token');
      request.headers.append('authorization', 'Bearer ' + request.cookies.get('access_token') || '')
    // Runs for '/admin' 
	//const { refresh_token } = request.cookies
	//console.log(request.cookies.get('refresh_token')) 

    //request.headers.set('authorization', 'Bearer ' + request.cookies.get('refresh_token') || '');
    const authorization = request.headers.get('authorization');
    
    if (
      authorization &&
      authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        const {payload} = await jwtVerify(access_token, new TextEncoder().encode(process.env.JWT_SECRET));
        if (payload.role !== 'admin') {
          throw new Error('Access denied')
        }
        return response;
      } catch (e) {
        if (e.claim === 'exp') {
          await refresh(request) //нихуя не работает
          .catch(e => {
            console.log(e);
            url.pathname = '/login';
            return NextResponse.redirect(url);
          });
        }
        console.log(e);
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }
    }
  
    if (!access_token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    }

    // if (request.nextUrl.pathname.startsWith('/api/refresh')) {
    //     //response.cookies.set('refresh_token', )
    // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin']
}