import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";
import { z } from "zod";

import { getBadges } from "../../../helpers/getBadges";

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
