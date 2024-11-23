import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

interface ILoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<ILoginForm>();
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data: ILoginForm) => {
    try {
      console.log(data);

      // simular login
      const response = {
        token: "123456789",
        roles: ["paciente"],
      };

      // Guardar token y roles en el estado
      setAuth(response.token, response.roles);

      // Redirigir a la página principal
      router.push("/paciente");
    } catch (error) {
      console.log("Error en login", error);
      alert("Error en las credenciales");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
