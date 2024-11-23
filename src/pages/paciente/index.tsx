// pages/patient/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
// components
import Navbar from "@/components/Navbar";

const PatientDashboard: React.FC = () => {
  const router = useRouter();
  const { isAuth, roles } = useAuthStore();
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene el rol de "paciente"
    if (!isAuth) {
      router.push("/auth/login"); // Si no está autenticado, redirigir a login
    } else if (!roles.includes("paciente")) {
      // Si el usuario no tiene el rol de "paciente", redirigir a su dashboard correspondiente
      router.push("/"); // Redirige a la página de inicio (Home)
    } else {
      setLoading(false); // Si está autenticado y tiene el rol adecuado, continuar cargando
    }
  }, [isAuth, roles, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">Cargando tu Dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bienvenido al Dashboard de Paciente
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tarjetas de información o funcionalidades */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Ver mis Citas
            </h2>
            <p className="text-gray-600">
              Consulta tus próximas citas con los profesionales médicos.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Ver Citas
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Mi Perfil
            </h2>
            <p className="text-gray-600">
              Actualiza tus datos personales y preferencias.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
              Editar Perfil
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Mensajes
            </h2>
            <p className="text-gray-600">
              Revisa mensajes importantes de tus profesionales o la ONG.
            </p>
            <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700">
              Ver Mensajes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
