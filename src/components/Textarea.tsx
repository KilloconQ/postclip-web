"use client";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const Textarea = () => {
  const [value, setValue] = useState("");
  const maxLength = 1000;

  return (
    <div className="w-2xl flex flex-col gap-2">
      {/* Textarea con hint adentro */}
      <div className="relative">
        <textarea
          className="border-2 border-solid w-full h-96 resize-none rounded-lg p-4 bg-gray-900 text-white"
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Escribe aquí tu mensaje..."
        />
        {/* Hint MUY pegado abajo a la derecha */}
        <span
          className="absolute right-3 bottom-2 text-xs text-gray-400 bg-gray-900 bg-opacity-90 px-1 rounded pointer-events-none select-none"
          style={{ zIndex: 10 }}
        >
          {value.length} / {maxLength}
        </span>
      </div>
      {/* Barra de controles */}
      <div className="flex items-center gap-4 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 mt-1">
        <label className="flex items-center gap-1 text-xs text-white">
          <input type="checkbox" className="accent-blue-500" />X
        </label>
        <label className="flex items-center gap-1 text-xs text-white">
          <input type="checkbox" className="accent-sky-400" />
          Bluesky
        </label>
        <div className="flex-1" />
        <button className="flex items-center justify-center bg-blue-600 p-3 rounded-md hover:bg-blue-700 transition">
          <SendHorizontal className="m-0" />
        </button>
      </div>
    </div>
  );
};

export default Textarea;
