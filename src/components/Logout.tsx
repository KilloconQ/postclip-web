'use server';
import { logout } from '@/app/logout/actions';

const Logout = () => {
  return (
    <form action={logout} method="POST" className="absolute top-4 right-4 z-50">
      <button
        type="submit"
        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
      >
        Cerrar sesión
      </button>
    </form>
  );
};

export default Logout;
