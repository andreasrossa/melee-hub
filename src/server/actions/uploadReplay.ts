"use server";

import { TRPCError } from "@trpc/server";
import { api } from "~/trpc/server";

export const uploadReplayAction = async (
  _prevState: unknown,
  formData: FormData,
) => {
  const file = formData.get("file") as File;

  if (!file) {
    return {
      error: "No file uploaded",
    };
  }

  try {
    await api.replay.upload({
      file,
    });

    return {
      success: "Replay uploaded successfully",
    };
  } catch (error) {
    if (error instanceof TRPCError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Something went wrong",
    };
  }
};
