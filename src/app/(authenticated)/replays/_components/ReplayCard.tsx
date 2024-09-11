import dayjs from "dayjs";
import {
  BarChartIcon,
  CalendarIcon,
  ClockIcon,
  CrownIcon,
  DotIcon,
  MapIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import { characterShortNames } from "~/lib/slippi/character";
import { stageNames } from "~/lib/slippi/stage";
import { cn } from "~/lib/utils";
import { type Replay } from "~/server/db/schema";

export default function ReplayCard({
  replay,
  className,
  ...cardProps
}: { replay: Replay } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={cn("w-full", className)} {...cardProps}>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge>
              {characterShortNames[replay.characterOne]}
              {replay.winner === 0 ? (
                <CrownIcon className="ml-1 h-4 w-4" />
              ) : null}
            </Badge>
            <span className="text-sm text-muted-foreground">vs</span>
            <Badge>
              {characterShortNames[replay.characterTwo]}
              {replay.winner === 1 ? <CrownIcon className="h-4 w-4" /> : null}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span className="flex items-center">
                {dayjs(replay.startedAt).format("MMM DD, YYYY")}
                <DotIcon className="h-4 w-4" />
                {dayjs(replay.startedAt).format("HH:mm")}
              </span>
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {`${Math.floor(replay.lastFrame / 60 / 60)}:${Math.floor(
                (replay.lastFrame / 60) % 60,
              )}`}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <MapIcon className="h-4 w-4" />
              {stageNames[replay.stageId]}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BarChartIcon className="mr-2 h-4 w-4" />
                Analyze
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
