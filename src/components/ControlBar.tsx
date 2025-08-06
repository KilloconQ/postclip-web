import { Send } from 'lucide-react';

const ControlBar = () => {
  return (
    <div className="flex items-center justify-end gap-4  px-4 py-2 mt-1">
      <label className="flex items-center gap-2 text-white">
        <input type="checkbox" className="accent-blue-500" />X
      </label>
      <label className="flex items-center gap-2 text-white">
        <input type="checkbox" className="accent-sky-400" />
        Bluesky
      </label>
      <div className="flex-1" />
      {/* <div className="flex items-center justify-end gap-2 px-4 py-2 mt-1"> */}
      <button className="flex items-center text-white justify-center bg-blue-600 p-3 rounded-md hover:bg-blue-700 transition">
        <div className="flex items-center gap-2">
          <Send className="m-0" /> <span>Publicar</span>
        </div>
      </button>
      {/* </div> */}
    </div>
  );
};

export default ControlBar;
