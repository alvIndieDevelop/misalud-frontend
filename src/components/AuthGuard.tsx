import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

interface IAuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // roles permitidos para esta pagina
}

const AuthGuard: React.FC<IAuthGuardProps> = ({ children, allowedRoles }) => {
  const { isAuth, roles } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      // Redirige al login si no está autenticado
      router.push("/auth/login");
    } else if (
      allowedRoles &&
      !roles.some((role) => allowedRoles.includes(role))
    ) {
      // Redirige a home si no tiene el rol permitido
      router.push("/");
    }
  }, [isAuth, roles, allowedRoles, router]);

  if (!isAuth) return null; // Evita renderizar hasta verificar

  return <>{children}</>;
};

export default AuthGuard;
