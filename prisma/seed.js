const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function Location() {
    const Location = await prisma.Locations.createMany({
        data: [
            { title: "Location1" },
            { title: "Location2" },
            { title: "Location3" },
        ],
        skipDuplicates: true
        }
    );
}


async function Product() {
    const Product = await prisma.Products.createMany({
        data: [
            { title: "Product1" },
            { title: "Product2" },
            { title: "Product3" },

        ],
        skipDuplicates: true
        }
    );
}

async function Storage() {
    const Storage = await prisma.Storages.createMany({
        data: [
            { title: "storage1",
            location_id:3 },
            { title: "storage2",
            location_id:3 },
            { title: "storage3",
            location_id:1 },
            { title: "storage4",
            location_id:1 },
            { title: "storage5",
            location_id:2},
        ],
        skipDuplicates: true
        }
    );
}
Storage()
Location()
Product()


    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })