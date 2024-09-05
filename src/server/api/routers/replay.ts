import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SlippiGame } from "@slippi/slippi-js";
import fs from "node:fs/promises";

export const replayRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(z.object({ replayFile: z.instanceof(File) }))
    .mutation(async ({ ctx, input }) => {
      const { replayFile } = input;
      const { user } = ctx.session;

      // 1. save file to disk
      const filePath = `./uploads/${user.id}/${replayFile.name}`;
      await fs.writeFile(filePath, Buffer.from(await replayFile.arrayBuffer()));

      // 2. read the replay file
      const game = new SlippiGame(filePath);

      // 3. save to database
    }),
});
