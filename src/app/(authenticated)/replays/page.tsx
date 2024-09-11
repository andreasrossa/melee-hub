import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Select, SelectTrigger } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { api, HydrateClient } from "~/trpc/server";
import ReplayList from "./_components/ReplayList";

export default function Page() {
  void api.replay.list.prefetch();

  return (
    <HydrateClient>
      <Card className="flex h-full flex-col">
        <CardHeader className="">
          <CardTitle>Replays</CardTitle>
          <CardDescription>
            Browse and filter replays to find the one you want to analyze.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="grid h-full w-full flex-1 gap-6 md:grid-cols-2 lg:grid-cols-[1fr,auto,1fr]">
            <div className="relative hidden flex-col items-start gap-8 md:flex">
              <form className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Filter Replays
                  </legend>
                  <div className="gap-3">
                    <Select>
                      <SelectTrigger></SelectTrigger>
                    </Select>
                  </div>
                </fieldset>
              </form>
            </div>
            <Separator
              orientation="vertical"
              className="my-1 hidden h-auto lg:block"
            />
            <ReplayList />
          </div>
        </CardContent>
      </Card>
    </HydrateClient>
  );
}
