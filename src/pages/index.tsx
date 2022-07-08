import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

import { trpc } from "../utils/trpc";
import { getBadgeName } from "../helpers/getBadgeName";
import toast from "react-hot-toast";

const Home: NextPage = () => {
  const [id, setId] = useState<string | null>(null);

  const data = trpc.useQuery(["lookup", { id }], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Head>
        <title>Discord Lookup</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="A tool to lookup Discord IDs" />
        <meta property="og:site_name" content="Discord ID Lookup" />
        <meta
          property="og:description"
          content="A tool to lookup Discord IDs"
        />
        <meta property="og:image" content="/images/banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#0284C7" />
        <meta name="twitter:title" content="Discord ID Lookup" />
        <meta
          name="twitter:description"
          content="A tool to lookup Discord IDs"
        />
        <meta name="twitter:image" content="/images/banner.png" />
      </Head>

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

        {data.data?.discriminator ? (
          <>
            <div className="mt-10" />
            <div className="flex flex-col items-center justify-center">
              <div className="mt-4" />
              <h1 className="text-sky-500 font-medium">
                <span className="text-3xl">{data.data.username}</span>

                <span className="text-xl">#{data.data.discriminator}</span>
              </h1>
              <div className="mt-4" />
              <div className="rounded-full relative" data-tooltip="Click to copy image url" onClick={() => {
                navigator.clipboard.writeText(`https://cdn.discordapp.com/avatars/${data.data!.id}/${data.data!.avatar}`);
                toast.success("Copied to clipboard" ,  {
                  style: {
                    background: "#262626",
                    color: "#e0f2fe",
                  },
                  iconTheme: {
                    primary: "skyblue",
                    secondary: "#262626"
                  },
                });
              }}>
                <Image
                  src={`https://cdn.discordapp.com/avatars/${data.data.id}/${data.data.avatar}?size=2048`}
                  className="rounded-full h-32 w-32 avatar cursor-pointer"
                  alt={`${data.data.username} avatar`}
                  width={128}
                  height={128}
                />
              </div>

              <div className="mt-4" />
              <div className="flex gap-5">
                {data.data.public_flags.map((flag) => (
                  <div className="cursor-help relative tooltip" data-tooltip-location="bottom" data-tooltip={getBadgeName(flag)}>
                    <Image
                      src={`/images/${flag}.png`}
                      alt={flag}
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-10 text-xl">
            {id ? (
              <span className="text-red-500">
                {data.isLoading ? "" : "Please enter a valid id"}
              </span>
            ) : (
              <span className="text-neutral-500">Waiting for input</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
