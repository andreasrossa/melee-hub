import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import DiscordSignInButton from "./_components/DiscordSignInButton";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/replays");
    return <div>Redirecting to replay dashboard...</div>;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>
            Slippi Replay Browser{" "}
            <span className="text-sm text-gray-500">alpha</span>
          </CardTitle>
          <CardDescription>Login to get started.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <DiscordSignInButton className="w-full" />
        </CardContent>
        <CardFooter>
          <Link
            href="https://github.com/andreasrossa/melee-hub"
            target="_blank"
            className="flex items-center gap-2"
          >
            <GitHubLogoIcon className="size-4" />
            <span className="text-sm text-gray-500">View on GitHub</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
