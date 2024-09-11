"use client";

import { api } from "~/trpc/react";
import ReplayCard from "../replays/_components/ReplayCard";

export const ReplayBrowser = () => {
  const [replays] = api.replay.list.useSuspenseQuery();
  return (
    <div className="flex w-full flex-col gap-2">
      {replays.map((replay) => (
        <ReplayCard key={replay.id} replay={replay} />
      ))}
    </div>
  );
};
