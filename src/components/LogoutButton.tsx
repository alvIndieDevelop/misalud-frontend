import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";

const LogoutButton: React.FC = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded-md"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
