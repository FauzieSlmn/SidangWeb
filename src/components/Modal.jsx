import { useEffect } from "react";

export default function Modal({ message, onClose }) {
  useEffect(() => {
    const audio = new Audio("/sounds/mission-complete.mp3");
    audio.play();
  }, []);    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#0f0f0f] border border-green-500 rounded-lg p-6 text-center shadow-lg max-w-sm w-full">
        <h2 className="text-2xl text-green-400 font-bold mb-2">🎓 Mission Accomplished</h2>
        <p className="text-green-200 text-sm mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded"
        >
          ✅ Confirm
        </button>
      </div>
    </div>
  );
}
