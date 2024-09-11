import { z } from "zod";
import { api } from "~/trpc/server";
import { LCancelPercentageCard } from "./_components/LCancelPercentageCard";

export default async function ReplayStatsPage({
  params,
}: {
  params: { id: string };
}) {
  const { success, data: replayId } = z.coerce.number().safeParse(params.id);

  if (!success) {
    return <div>Invalid replay ID</div>;
  }

  const replay = await api.replay.getOne({ replayId });

  if (!replay) {
    return <div>Replay not found</div>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4">
      <LCancelPercentageCard value={0.83} />
    </div>
  );
}
