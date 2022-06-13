import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

import { trpc } from "../utils/trpc";
import { getBadgeName } from "../helpers/getBadgeName";

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
            <div className="flex gap-5">
              {data.data.public_flags.map((flag) => (
                <HoverCard.Root openDelay={250} closeDelay={150}>
                  <HoverCard.Trigger>
                    <div className="cursor-help">
                      <Image
                        src={`/images/${flag}.png`}
                        alt={flag}
                        width={28}
                        height={28}
                      />
                    </div>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <span className="text-sm">{getBadgeName(flag)}</span>
                    <HoverCard.Arrow />
                  </HoverCard.Content>
                </HoverCard.Root>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
