import { type SlippiGame } from "@slippi/slippi-js";

export default function getInfoFromGame(game: SlippiGame) {
  const metadata = game.getMetadata();
  const winners = game.getWinners();
  const settings = game.getSettings();

  if (!metadata) {
    throw new Error("could not read metadata");
  }

  if (!settings) {
    throw new Error("could not read settings");
  }

  if (settings.players.length !== 2 || winners.length !== 1) {
    throw new Error("not a valid 1v1 game");
  }

  const players = [
    {
      character: settings.players[0]?.characterId,
      playerIndex: settings.players[0]?.playerIndex,
      nametag: settings.players[0]?.nametag,
    },
    {
      character: settings.players[1]?.characterId,
      playerIndex: settings.players[1]?.playerIndex,
      nametag: settings.players[1]?.nametag,
    },
  ];

  if (!players[0]?.character || !players[1]?.character) {
    throw new Error("could not read characters");
  }

  if (settings?.stageId === undefined) {
    throw new Error("could not read stage");
  }

  if (metadata.lastFrame === undefined) {
    throw new Error("could not read last frame");
  }

  const winnerIndex = winners[0]?.playerIndex;

  if (winnerIndex === undefined) {
    throw new Error("could not read winner");
  }

  const winner = players.findIndex(
    (player) => player.playerIndex === winnerIndex,
  );

  if (winner === -1) {
    throw new Error("could not read winner");
  }

  return {
    lastFrame: metadata.lastFrame ?? -1,
    stageId: settings?.stageId ?? -1,
    startedAt: new Date(),
    characterOne: players[0].character,
    characterTwo: players[1].character,
    playerOne: players[0].nametag ?? null,
    playerTwo: players[1].nametag ?? null,
    winner,
  };
}
