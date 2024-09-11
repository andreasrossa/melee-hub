import { Readable } from "node:stream";
import crypto from "node:crypto";

export const getHashFromBuffer = async (buffer: Buffer) => {
  const hash = crypto.createHash("sha256");
  const rs = Readable.from(buffer);

  for await (const chunk of rs) {
    hash.update(chunk as crypto.BinaryLike);
  }

  return hash.digest("hex");
};
