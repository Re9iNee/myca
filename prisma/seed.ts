import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // await clearDatabase();
}

async function clearDatabase() {
  await prisma.services.deleteMany();
  console.log(`🌱 Deleted all services`);
  await prisma.cars.deleteMany();
  console.log(`🌱 Deleted all cars`);
  await prisma.users.deleteMany();
  console.log(`🌱 Deleted all users`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
