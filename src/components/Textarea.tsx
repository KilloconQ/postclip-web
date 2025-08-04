'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

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

  return (
    <form onSubmit={handleSubmit} className="w-2xl flex flex-col gap-2">
      <div className="relative">
        <textarea
          className={`border-2 border-solid w-full h-96 resize-none rounded-lg p-4 bg-gray-800 text-white ${
            isTyping ? 'caret-transparent' : ''
          }`}
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Escribe aquí tu mensaje..."
          readOnly={isTyping} // bloquea edición mientras 'escribe'
        />
        <span
          className="absolute right-3 bottom-3 text-xs text-gray-400 bg-gray-800 bg-opacity-90 px-1 rounded pointer-events-none select-none"
          style={{ zIndex: 10 }}
        >
          {value.length} / {maxLength}
        </span>

        {/* Limpiar texto */}
        <button
          className="absolute right-3 top-3 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
          type="button"
          onClick={() => {
            cancelTypingRef.current = true;
            setIsTyping(false);
            setValue('');
            fullTextRef.current = '';
          }}
          aria-label="Mejorar texto"
          title="Mejorar texto"
          disabled={loading}
        >
          <Sparkles />
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

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || (!value.trim() && !isTyping)}
      >
        {loading ? 'Enviando...' : 'Mejorar post'}
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <ControlBar />
    </form>
  );
};

export default Textarea;
