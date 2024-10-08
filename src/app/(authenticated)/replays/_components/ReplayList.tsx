"use client";

import { api } from "~/trpc/react";
import ReplayCard from "./ReplayCard";

export default function ReplayList() {
  const [replays] = api.replay.list.useSuspenseQuery();

  return (
    <div className="flex flex-col gap-2">
      {replays.map((replay) => (
        <ReplayCard key={replay.id} replay={replay} />
      ))}
    </div>
  );
}
