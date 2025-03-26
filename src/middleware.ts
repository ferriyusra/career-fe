import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWTExtended } from './types/Auth';
import { getToken } from 'next-auth/jwt';
import { environment } from './config/environment';

export async function middleware(request: NextRequest) {
	const token: JWTExtended | null = await getToken({
		req: request,
		secret: environment.AUTH_SECRET,
	});

	const { pathname } = request.nextUrl;

	if (pathname === '/auth/login' || pathname === '/auth/register') {
		if (token) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	if (pathname.startsWith('/admin')) {
		if (!token) {
			const url = new URL('/auth/login', request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.url));

			return NextResponse.redirect(url);
		}

		if (token?.user?.role !== 'ADMIN') {
			return NextResponse.redirect(new URL('/', request.url));
		}

		if (pathname === '/admin') {
			return NextResponse.redirect(new URL('/admin/category', request.url));
		}
	}

	if (pathname.startsWith('/user')) {
		if (!token) {
			const url = new URL('/auth/login', request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.url));

			return NextResponse.redirect(url);
		}

		if (pathname === '/user') {
			return NextResponse.redirect(new URL('/user/profile', request.url));
		}
	}
}

export const config = {
	matcher: ['/auth/:path*', '/admin/:path*', '/user/:path*'],
};
