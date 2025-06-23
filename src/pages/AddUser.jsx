import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Nama agen wajib diisi!");
    await addDoc(collection(db, "students"), {
      name,
      message,
      graduated: false,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0f0f0f] border border-green-600 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-400 mb-2">🧾 FORM REKRUT AGEN BARU</h2>
        <p className="text-sm text-gray-400 italic mb-6">Masukkan informasi agen untuk menjalankan misi teknis.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">🧑‍💻 Nama Agen</label>
            <input
              type="text"
              className="w-full bg-black border border-green-500 text-green-200 px-3 py-2 rounded placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Contoh: R-001 AXEL"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">📄 Kesan & Pesan (opsional)</label>
            <textarea
              rows="4"
              className="w-full bg-black border border-green-500 text-green-200 px-3 py-2 rounded placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Pesan terakhir agen sebelum keluar dari sistem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded mt-4 transition"
          >
            🚀 DEPLOY AGEN KE MISI
          </button>
        </form>
      </div>
    </div>
  );
}
