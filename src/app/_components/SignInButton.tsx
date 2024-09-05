"use client";

import type { Provider } from "next-auth/providers/index";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function SignInButton({
  provider,
}: {
  provider: ClientSafeProvider;
}) {
  return (
    <Button key={provider.id} onClick={() => signIn(provider.id)}>
      Sign in with {provider.name}
    </Button>
  );
}
