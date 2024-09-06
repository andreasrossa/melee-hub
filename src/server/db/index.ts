import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "./db";

import * as schema from "./schema";

export const db = drizzle(sql, { schema });
