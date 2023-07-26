const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function Sellers() {
    const Sellers = await prisma.Sellers.createMany({
        data: [
            { title: "Sellers1" },
            { title: "Sellers2" },
            { title: "Sellers3" },
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
            seller_id:3 },
            { title: "storage2",
            seller_id:3 },
            { title: "storage3",
            seller_id:1 },
            { title: "storage4",
            seller_id:1 },
            { title: "storage5",
            seller_id:2},
        ],
        skipDuplicates: true
        }
    );
}

Sellers()
Product()
Storage()

    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })