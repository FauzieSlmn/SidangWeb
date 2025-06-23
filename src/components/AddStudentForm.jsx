import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addDoc(collection(db, "students"), {
      name,
      message,
      graduated: false,
    });
    setName("");
    setMessage("");
    onAdd(); // refresh data
  };

  return (
    <div className="p-4 border rounded mb-4 bg-white">
      <h2 className="font-semibold text-lg mb-2">➕ Tambah Mahasiswa</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Nama"
          className="border px-3 py-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kesan & Pesan"
          className="border px-3 py-2 rounded w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}
