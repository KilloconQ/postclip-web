'use client';

import { useState } from 'react';
import ControlBar from './ControlBar';

const Textarea = () => {
  const [value, setValue] = useState('');
  const maxLength = 1000;

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
      </div>
      <ControlBar />
    </div>
  );
};

export default Textarea;
