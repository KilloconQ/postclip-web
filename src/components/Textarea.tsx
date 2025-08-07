'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Spinner from '@/components/ui/Spinner';

import ControlBar from './ControlBar';
import { getOpenAiResponse } from '../lib/api';

const TYPING_MS = 18; // velocidad de tipeo (ms por carácter)

const Textarea = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const fullTextRef = useRef<string>(''); // guarda el texto objetivo (response)
  const cancelTypingRef = useRef<boolean>(false); // para cancelar la animación
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false; // cleanup al desmontar
      cancelTypingRef.current = true;
    };
  }, []);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const typeText = async (text: string) => {
    setIsTyping(true);
    cancelTypingRef.current = false;
    setValue(''); // comenzamos desde vacío (o pon aquí tu valor inicial si quieres concatenar)
    for (let i = 0; i < text.length; i++) {
      if (!mountedRef.current || cancelTypingRef.current) break;
      setValue(text.slice(0, i + 1));
      await sleep(TYPING_MS);
    }
    if (mountedRef.current) setIsTyping(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await getOpenAiResponse(value);
      // Guarda el texto completo y dispara la animación
      fullTextRef.current = res ?? '';
      await typeText(fullTextRef.current);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error al obtener la respuesta de OpenAI: ${err.message}`);
      } else {
        setError(`Error al obtener la respuesta de OpenAI: ${String(err)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const maxLength = 250;

  const skipTyping = () => {
    // Coloca el texto completo inmediatamente
    cancelTypingRef.current = true;
    setValue(fullTextRef.current);
    setIsTyping(false);
  };

  const rewriteText = async () => {
    if (!value.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getOpenAiResponse(value);
      fullTextRef.current = res ?? '';
      await typeText(fullTextRef.current);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error al obtener la respuesta de OpenAI: ${err.message}`);
      } else {
        setError(`Error al obtener la respuesta de OpenAI: ${String(err)}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-2xl flex flex-col gap-2">
      <div className="relative">
        <textarea
          className={`border-1 border-slate-700  border-solid w-full h-96 resize-none rounded-lg p-4 bg-gray-800 text-white ${
            isTyping ? 'caret-transparent' : ''
          }`}
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Escribe aquí tu mensaje..."
          readOnly={isTyping} // bloquea edición mientras 'escribe'
        />
        <span className="absolute right-3 bottom-3 z-10">
          <Badge>{maxLength - value.length}</Badge>
        </span>

        {/* Limpiar texto */}
        <button
          className={`absolute right-3 top-3 p-2 text-white bg-gray-700 rounded-full hover:bg-gray-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="button"
          onClick={rewriteText}
          aria-label="Mejorar texto"
          title="Mejorar texto"
          disabled={loading}
        >
          {loading ? <Spinner size={20} color="white" /> : <Sparkles />}{' '}
        </button>

        {/* Botón para saltar animación */}
        {isTyping && (
          <button
            type="button"
            onClick={skipTyping}
            className="absolute left-3 bottom-3 text-xs underline text-gray-300 hover:text-white"
          >
            Mostrar todo
          </button>
        )}

        {/* Cursor parpadeante cuando está tipeando */}
        {isTyping && <span className="absolute left-4 top-4 animate-pulse select-none">▍</span>}
      </div>

      {error && (
        <div className="text-red-500 mt-2 items-center text-center">
          Hubo un error inesperado inténtelo más tarde
        </div>
      )}

      <hr className="border-slate-700" />

      <ControlBar />
    </form>
  );
};

export default Textarea;
