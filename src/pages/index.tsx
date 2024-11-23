import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

const roleDashboards: { [key: string]: string } = {
  paciente: "/paciente",
  profesional: "/profesional",
  ong: "/ong",
};

const Home: React.FC = () => {
  const router = useRouter();
  const { isAuth, roles } = useAuthStore();

  useEffect(() => {
    if (!isAuth) {
      // Si no está autenticado, redirige al login
      router.push("/auth/login");
      return;
    }

    // Redirige al dashboard correspondiente según el primer rol del usuario
    const primaryRole = roles[0]; // Puedes ajustar la lógica si necesitas más roles
    const dashboardPath = roleDashboards[primaryRole];

    if (dashboardPath) {
      router.push(dashboardPath);
    } else {
      // Maneja el caso de roles no definidos
      console.warn("Rol desconocido:", primaryRole);
      router.push("/auth/login");
    }
  }, [isAuth, roles, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Redirigiendo...</h1>
    </div>
  );
};

export default Home;
