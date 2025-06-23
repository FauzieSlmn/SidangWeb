import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Link } from "react-router-dom";
import Modal from "./Modal";

export default function StudentCard({ student, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(student.message || "");

  const updateMessage = async () => {
    await updateDoc(doc(db, "students", student.id), { message });
    setIsEditing(false);
    onUpdate();
  };
  const [showModal, setShowModal] = useState(false);

const markGraduated = async () => {
  await updateDoc(doc(db, "students", student.id), { graduated: true });
  setShowModal(true); // Show popup
  onUpdate(); // Refresh list
};

  

  return (
    <div className={`p-5 rounded-xl bg-black border border-green-500 shadow-md transition hover:shadow-green-400 font-mono text-green-300`}>
      <div className="mb-2 text-xs text-gray-400">
        🔎 AGENT ID: {student.id.slice(0, 6).toUpperCase()}
      </div>
      <h3 className="text-2xl font-bold mb-1 glitch-text">
          🧑‍💻 AGENT: {student.name.toUpperCase()}
      </h3>


      {!isEditing ? (
        <p className="text-green-200 italic mt-2 mb-3">📄 REPORT: {message || "No mission report submitted."}</p>
      ) : (
        <textarea
          className="w-full bg-gray-900 border border-green-600 text-green-200 p-2 rounded text-sm mb-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      )}

      <p className={`font-bold text-sm mb-3 ${student.graduated ? "text-green-400" : "text-yellow-400"}`}>
        {student.graduated ? "🟢 STATUS: MISSION COMPLETED" : "🔴 STATUS: MISSION ACTIVE"}
      </p>

      <div className="flex flex-wrap gap-3 text-xs">
        {!student.graduated && (
          <button
            onClick={markGraduated}
            className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            ✅ COMPLETE MISSION
          </button>
        )}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            ✏️ EDIT REPORT
          </button>
        ) : (
          <button
            onClick={updateMessage}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
          >
            💾 SAVE REPORT
          </button>
        )}
        <Link
          to={`/edit/${student.id}`}
          className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded"
        >
          🔐 AGENT PROFILE
        </Link>
      </div>
      {showModal && (
  <Modal
    message={`Congratulations, Agent ${student.name.toUpperCase()}.\nYour mission in this chapter is now complete.
You’ve worked hard — make sure to let your parents know.
Their pride is your greatest medal.

The road ahead is still long.
Stay kind, stay curious, and keep building what matters.

HQ will be watching. 🛰️`}
    onClose={() => setShowModal(false)}
  />
)}

    </div>
    
  );
}
