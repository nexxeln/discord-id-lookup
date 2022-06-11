import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query("lookup", {
    input: z.object({
      id: z.string().nullish(),
    }),
    async resolve({ input }) {
      if (!input?.id) return;

      const userData = await fetch(
        `https://discord.com/api/v10/users/${input.id}`,
        {
          headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
        }
      ).then((res) => res.json());

      return {
        userData,
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
