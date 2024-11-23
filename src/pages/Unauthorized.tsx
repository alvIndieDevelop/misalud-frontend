// pages/unauthorized.tsx
const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Acceso no autorizado</h1>
        <p className="mb-4">
          No tienes permiso para ver esta página. Si crees que es un error,
          contacta a soporte.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
