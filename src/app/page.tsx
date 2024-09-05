import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import SignInButton from "./_components/SignInButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/replays");
    return <div>Redirecting to replay dashboard...</div>;
  }

  const providers = await getProviders();

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="h-[200px] w-[400px]">
        <CardHeader>
          <CardTitle>
            Slippi Replay Browser{" "}
            <span className="text-sm text-gray-500">alpha</span>
          </CardTitle>
          <CardDescription>Login to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.values(providers).map((provider) => (
            <SignInButton key={provider.id} provider={provider} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
