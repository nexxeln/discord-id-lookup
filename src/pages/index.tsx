import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [id, setId] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4" />
      <h1 className="text-sky-700 text-3xl font-medium">Discord ID Lookup</h1>

      <div className="mt-10" />
      <input
        type="text"
        placeholder="User ID"
        className="bg-dark-700 rounded-md px-4 py-2 transition focus:(outline-none ring-2 ring-sky-600)"
        value={id ?? ""}
        onChange={(event) => setId(event.target.value.trim() || null)}
      />
    </div>
  );
};

export default Home;
