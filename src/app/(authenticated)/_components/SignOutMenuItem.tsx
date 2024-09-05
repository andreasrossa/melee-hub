"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

export default function SignOutMenuItem() {
  return (
    <DropdownMenuItem onClick={() => signOut()}>
      <LogOutIcon className="size-4" />
      <span>Sign out</span>
    </DropdownMenuItem>
  );
}
