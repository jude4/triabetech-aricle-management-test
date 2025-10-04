import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  var __db__: PrismaClient;
}

let db: PrismaClient;

// Check if we're using Prisma Accelerate (production) or local database
const isUsingAccelerate = process.env.DATABASE_URL?.startsWith(
  "@prisma+postgres://"
);
const isProduction = process.env.NODE_ENV === "production";

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// In production we'll have a single connection to the DB.
if (isUsingAccelerate || isProduction) {
  // Use Prisma Accelerate for production
  db = new PrismaClient().$extends(withAccelerate());
} else {
  // Use standard Prisma client for local development
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
  db = global.__db__;
  db.$connect();
}

export { db };
