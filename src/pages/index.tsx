import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [id, setId] = useState<string | null>(null);

  const data = trpc.useQuery(["lookup", { id }], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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

      {data.data && (
        <>
          <div className="mt-10" />
          <div className="flex flex-col items-center justify-center">
            <div className="mt-4" />
            <h1 className="text-sky-500 font-medium">
              <span className="text-3xl">{data.data.username}</span>

              <span className="text-xl">#{data.data.discriminator}</span>
            </h1>
            <div className="mt-4" />
            <Image
              src={`https://cdn.discordapp.com/avatars/${data.data.id}/${data.data.avatar}?size=2048`}
              className="rounded-full h-32 w-32"
              alt={`${data.data.username} avatar`}
              width={128}
              height={128}
            />

            <div className="mt-4" />
            <p className="text-sky-400">
              Public Flags:{" "}
              <code className="text-sky-800 bg-sky-200 rounded-md p-[2px]">
                {data.data.public_flags.map((flag) => flag).join(", ")}
              </code>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
