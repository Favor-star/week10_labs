import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.skill.deleteMany();
  await prisma.category.deleteMany();
  await prisma.category.createMany({
    data: [
      {
        name: "Backend Development",
      },
      {
        name: "Frontend Development",
      },

      {
        name: "DevOps",
      },
      {
        name: "UI/UX",
      },
      {
        name: "Others",
      },
    ],
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
