import { SlippiGame } from "@slippi/slippi-js";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { z } from "zod";
import getInfoFromGame from "~/lib/slippi/getReplayFromGame";
import { getHashFromBuffer } from "~/lib/getHashFromBuffer";
import { replays } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const replayDir = "./replays";

export const replayRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(
      z.object({
        file: z.instanceof(File),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.file.size > 10000000) {
        throw new Error("File too large");
      }

      if (!input.file.name.endsWith(".slp")) {
        throw new Error("Not a valid slippi file");
      }

      const blob = await put(`${replayDir}/${input.file.name}`, input.file, {
        access: "public",
      });

      const buffer = Buffer.from(await input.file.arrayBuffer());
      const fileHash = await getHashFromBuffer(buffer);

      const existingReplay = await ctx.db.query.replays.findFirst({
        where: eq(replays.fileHash, fileHash),
      });

      if (existingReplay) {
        throw new Error("Replay already exists");
      }

      const game = new SlippiGame(buffer);

      const info = getInfoFromGame(game);

      await ctx.db.insert(replays).values({
        lastFrame: info.lastFrame,
        stageId: info.stageId,
        startedAt: info.startedAt,
        fileUrl: blob.downloadUrl,
        fileHash,
        characterOne: info.characterOne,
        characterTwo: info.characterTwo,
        playerOne: info.playerOne,
        playerTwo: info.playerTwo,
        winner: info.winner,
      });

      return blob;
    }),

  get: protectedProcedure
    .input(
      z.object({
        replayId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const replay = await ctx.db.query.replays.findFirst({
        where: eq(replays.id, input.replayId),
      });

      if (!replay) {
        throw new Error("Replay not found");
      }

      const file = await fetch(replay.fileUrl);

      const buffer = await file.arrayBuffer();
      const game = new SlippiGame(buffer);

      const metadata = game.getMetadata();
      const settings = game.getSettings();
      const winners = game.getWinners();
      const stats = game.getStats();

      return {
        metadata,
        settings,
        winners,
        stats,
      };
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.replays.findMany();
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        replayId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.db.query.replays.findFirst({
        where: eq(replays.id, input.replayId),
      });
    }),
});
