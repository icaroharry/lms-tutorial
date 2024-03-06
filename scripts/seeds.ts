const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Music" },
        { name: "Photography" },
        { name: "Fitness" },
        { name: "Accounting" },
        { name: "Computer Science" },
        { name: "Filming" },
        { name: "Engineering" },
      ],
    });

    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding the database categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();
