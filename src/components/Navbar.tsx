// components/Navbar.tsx
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth, roles, clearAuth } = useAuthStore();
  const router = useRouter();

  // Si no está autenticado, no se muestra el navbar
  if (!isAuth) return null;

  // Función para manejar el cambio de rol
  const handleRoleChange = (role: string) => {
    router.push(`/${role}`); // Redirige al dashboard correspondiente
  };

  // Función de logout
  const handleLogout = () => {
    clearAuth(); // Borra los datos de autenticación en el store
    router.push("/auth/login"); // Redirige al login
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">Logo</div>

        {/* Menú en Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          <span className="text-sm">{roles.join(", ")}</span>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cambiar Rol
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 bg-gray-700 rounded-lg shadow-lg mt-2 w-40">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Menú en Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú en Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-2 space-y-4">
          <div>
            <span className="text-sm">{roles.join(", ")}</span>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
          <div>
            <button
              onClick={() => setIsMenuOpen(false)} // Cerrar el menú
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
            >
              Cerrar Menú
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
