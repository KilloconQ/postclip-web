import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { logout } from '../logout/actions';

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8 w-full max-w-md flex flex-col items-center gap-6">
        <p className="text-xl font-bold">Hola {data.user.email}</p>
        <form action={'/logout/actions'} method="POST">
          <button
            type="submit"
            formAction={logout}
            className="py-2 px-6 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 transition"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
