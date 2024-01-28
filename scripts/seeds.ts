const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Electronics" },
        { name: "Books" },
        { name: "Home & Kitchen" },
        { name: "Toys & Games" },
        { name: "Clothing & Accessories" },
        { name: "Beauty, Health & Personal Care" },
        { name: "Sports & Outdoors" },
        { name: "Automotive" },
        { name: "Baby" },
        { name: "Handmade" },
        { name: "Other" },
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
