export default function FilterBar({ search, setSearch, filter, setFilter }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* 🔍 Input Search */}
      <input
        type="text"
        placeholder="Cari nama..."
        className="border px-4 py-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎯 Filter Buttons */}
      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilter("graduated")}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            filter === "graduated"
              ? "bg-green-600 text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-green-50"
          }`}
        >
          COMPLETED 🎓
        </button>
        <button
          onClick={() => setFilter("notGraduated")}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            filter === "notGraduated"
              ? "bg-yellow-500 text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-yellow-50"
          }`}
        >
          MISSION ACTIVE
        </button>
      </div>
    </div>
  );
}
