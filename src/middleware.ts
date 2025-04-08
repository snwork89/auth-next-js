import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  console.log("middleware inside called");
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ["/dashboard"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Auth routes
  const authRoutes = ["/login", "/signup"]
  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // If accessing a protected route without a session, redirect to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If accessing auth routes with a session, redirect to dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
