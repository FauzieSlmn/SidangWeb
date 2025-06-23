import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import StudentCard from "../components/StudentCard";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';


export default function Home() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const getData = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setStudents(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all"
        ? true
        : filter === "graduated"
        ? s.graduated
        : !s.graduated;

    return matchSearch && matchFilter;
  });

  return (
    
    <div className="min-h-screen bg-black text-green-300 font-mono p-4 md:p-8 bg-grid">
      <div className="max-w-6xl mx-auto">
        {/* Judul Dashboard */}
        <div className="flex justify-between items-center mb-6 border-b border-green-600 pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-400">
  <Typewriter
    words={['🛰️ MKB 2021', '🛰️ AGENT DASHBOARD']}
    loop={0}
    cursor
    cursorStyle="|"
    typeSpeed={80}
    deleteSpeed={50}
    delaySpeed={1500}
  />
</h1>
          </div>
          
        </div>

        {/* Filter */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Card Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((student) => (
              <StudentCard key={student.id} student={student} onUpdate={getData} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-12">
            🔍 Data agen tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}
