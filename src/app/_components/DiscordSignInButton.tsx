"use client";

import { signIn } from "next-auth/react";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function DiscordSignInButton(buttonProps: ButtonProps) {
  return (
    <Button {...buttonProps} onClick={() => signIn("discord")}>
      Sign in with Discord
    </Button>
  );
}
