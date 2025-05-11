import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export default prisma;

// async function gracefulShutdown() {
//   console.log("\nShutting down gracefully...");
//   await prisma.$disconnect();
// }

// process.on("SIGINT", gracefulShutdown); // Ctrl+C
// process.on("SIGTERM", gracefulShutdown); // Sent by cloud providers (AWS, etc.)
