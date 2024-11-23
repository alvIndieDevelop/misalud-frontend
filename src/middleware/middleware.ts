import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas que requieren autenticación
const protectedRoutes = ["/paciente", "/profesional", "/ong"];

// Mapear roles a rutas
const roleDashboards: { [key: string]: string } = {
  paciente: "/paciente",
  profesional: "/profesional",
  ong: "/ong",
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Obtener token de las cookies
  const role = request.cookies.get("role")?.value; // Obtener rol del usuario

  // Redirigir al login si no hay token
  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si el usuario está en la raíz, redirigir a su dashboard según el rol
  if (request.nextUrl.pathname === "/" && role) {
    const dashboardPath = roleDashboards[role];
    if (dashboardPath) {
      const dashboardUrl = new URL(dashboardPath, request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Dejar pasar la solicitud si no aplica ninguna redirección
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Aplica middleware para la raíz
    "/paciente", // Protege esta ruta
    "/profesional", // Protege esta ruta
    "/ong", // Protege esta ruta
  ],
};
