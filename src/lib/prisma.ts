// import { PrismaClient } from "../../.remove.generated/prisma";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/generated/client";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });
