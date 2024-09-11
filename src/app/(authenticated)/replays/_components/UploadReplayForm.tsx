"use client";

import { Loader2 } from "lucide-react";
import React, { useActionState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { uploadReplayAction } from "~/server/actions/uploadReplay";

export default function UploadReplayForm() {
  const [state, formAction, pending] = useActionState(uploadReplayAction, {
    error: "",
    success: undefined,
  });

  React.useEffect(() => {
    if (pending) {
      toast.loading("Uploading...", {
        id: "upload-replay",
      });
    }

    if (state?.error) {
      toast.error(state.error, {
        id: "upload-replay",
      });
    }

    if (state?.success) {
      toast.success(state.success, {
        id: "upload-replay",
      });
    }
  }, [state, pending]);

  return (
    <form className="space-y-2" action={formAction}>
      <div className="space-y-2">
        <Label>Replay File</Label>
        <Input type="file" name="file" />
      </div>
      <Button type="submit" disabled={pending} className="transition-all">
        {pending ? (
          <>
            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> Uploading...
          </>
        ) : (
          "Upload"
        )}
      </Button>
    </form>
  );
}
