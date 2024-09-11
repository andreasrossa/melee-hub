"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";

export default function UploadReplayFormSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
        </>
      ) : (
        "Upload"
      )}
    </Button>
  );
}
