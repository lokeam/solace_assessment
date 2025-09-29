import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        from: () => [],
      }),
    };
  }

  // Add proper error handling + set connection pool size
  const queryClient = postgres(process.env.DATABASE_URL, {
    onnotice: () => {},
    max: 10,
  });
  const db = drizzle(queryClient);
  return db;
};

export default setup();
