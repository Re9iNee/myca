import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // await clearDatabase();
}

async function clearDatabase() {
  await prisma.service.deleteMany();
  console.log(`🌱 Deleted all services`);
  await prisma.car.deleteMany();
  console.log(`🌱 Deleted all cars`);
  await prisma.user.deleteMany();
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
