import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [graduated, setGraduated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const ref = doc(db, "students", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name);
        setMessage(data.message || "");
        setGraduated(data.graduated || false);
      } else {
        alert("Data agen tidak ditemukan.");
        navigate("/");
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleSave = async () => {
    await updateDoc(doc(db, "students", id), {
      name,
      message,
      graduated,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0f0f0f] border border-green-600 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-400 mb-2">🔐 AGEN INTEL - MISSION STATUS</h2>
        <p className="text-sm text-gray-400 italic mb-6">Update agent information and mission status.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">🧑‍💻 Agent Name</label>
            <input
              type="text"
              className="w-full bg-black border border-green-500 text-green-200 px-3 py-2 rounded placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">📄 Laporan Misi (Kesan & Pesan)</label>
            <textarea
              rows="4"
              className="w-full bg-black border border-green-500 text-green-200 px-3 py-2 rounded placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              id="graduated"
              type="checkbox"
              className="mr-2 accent-green-500"
              checked={graduated}
              onChange={(e) => setGraduated(e.target.checked)}
            />
            <label htmlFor="graduated" className="text-sm">🟢 Mission Completed</label>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-700 hover:bg-blue-600 text-white py-2 rounded transition"
            >
              📤 Save Mission Update
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition"
            >
              🏠 Return to Headquarters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
