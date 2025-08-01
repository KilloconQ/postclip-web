'use client';

import { FormEvent, useState } from 'react';
import { Sparkles, Wand } from 'lucide-react';

import ControlBar from './ControlBar';

const Textarea = () => {
  const [value, setValue] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await getOpenAiResponse(value);
      setResponse(res);
    } catch (error) {
      setError('Error al obtener la respuesta de OpenAI');
    } finally {
      setLoading(false);
    }
  };

  const maxLength = 250;

  return (
    <div className="w-2xl flex flex-col gap-2">
      {/* Textarea con hint adentro */}
      <div className="relative">
        <textarea
          className="border-2 border-solid w-full h-96 resize-none rounded-lg p-4 bg-gray-800 text-white"
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Escribe aquí tu mensaje..."
        />
        <span
          className="absolute right-3 bottom-3 text-xs text-gray-400 bg-gray-800 bg-opacity-90 px-1 rounded pointer-events-none select-none"
          style={{ zIndex: 10 }}
        >
          {value.length} / {maxLength}
        </span>
        <button
          className="absolute right-3 top-3 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
          onClick={() => setValue('')}
        >
          <Sparkles />
        </button>
      </div>
      <ControlBar />
    </div>
  );
};

export default Textarea;
