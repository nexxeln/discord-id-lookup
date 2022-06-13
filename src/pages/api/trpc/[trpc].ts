import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";
import { z } from "zod";

const badges = [
  ["moderator", 262144],
  ["dev", 131072],
  ["bug-hunter-2", 16384],
  ["supporter", 512],
  ["balance", 256],
  ["brilliance", 128],
  ["bravery", 64],
  ["bug-hunter-1", 8],
  ["events", 4],
  ["partner", 2],
  ["staff", 1],
];

const getBadges = (val: number) => {
  let result: string[] = [];

  badges.forEach(([name, a]: any) => {
    let value = Math.floor(val / a);

    if (value) {
      val -= value * a;
      result.push(name);
    }
  });

  return result;
};

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query("lookup", {
    input: z.object({
      id: z.string().nullish(),
    }),
    async resolve({ input }) {
      if (!input?.id) return null;

      const userData = await fetch(
        `https://discord.com/api/v10/users/${input.id}`,
        {
          headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
        }
      ).then((res) => res.json());

      const publicFlags = getBadges(userData.public_flags);

      return {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        public_flags: publicFlags,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
