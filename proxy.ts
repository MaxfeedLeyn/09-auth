import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const privateRoutes = [
  "/profile",
  "/notes",
  "/notes/filter",
];

const authRoutes = [
  "/sign-in",
  "/sign-up",
];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Якщо користувач авторизований і йде на auth сторінки
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Якщо приватний маршрут
  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        // тут silent refresh
        const res = await fetch(new URL('/api/auth/session', request.url), {
          headers: {
            cookie: request.headers.get('cookie') || '',
          },
        });
        if (res.ok) {
          const response = NextResponse.next();
          const setCookieHeader = res.headers.get('set-cookie');
          if (setCookieHeader) {
            response.headers.set('set-cookie', setCookieHeader);
          }
          return response;
        } else {
          return NextResponse.redirect(new URL('/sign-in', request.url));
        }
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};