'use client';

import { useState } from 'react';
import { signup } from '../login/actions';
import Link from 'next/link';

export default function SignupPage() {
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    try {
      await signup(formData);
    } catch {
      setError('No se pudo crear la cuenta. ¿El email ya está registrado?');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Crear cuenta</h2>
        {error && <div className="mb-4 text-center text-red-400">{error}</div>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} method="post">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-rose-500 text-white font-semibold rounded-md shadow hover:bg-rose-600 transition"
          >
            Crear cuenta
          </button>
          <div className="mb-2 text-center">
            <Link href="/login" className="text-sm text-orange-400 hover:underline">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
