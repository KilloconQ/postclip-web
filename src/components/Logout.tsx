import { logout } from '@/app/logout/actions';

const Logout = () => {
  return (
    <form action={logout} method="post" className="absolute top-4 right-4 z-50">
      <button
        type="submit"
        className="py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 transition"
      >
        Cerrar sesión
      </button>
    </form>
  );
};

export default Logout;
