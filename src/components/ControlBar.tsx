import { SendHorizontal } from "lucide-react";

const ControlBar = () => {
  return (
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
  );
};

export default ControlBar;
