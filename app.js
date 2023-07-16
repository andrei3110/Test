const path = require("path");
const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

// Путь к директории файлов ресурсов (css, js, images)
app.use(express.static("public"));

// Настройка шаблонизатора
app.set("view engine", "ejs");

// Путь к директории файлов отображения контента
app.set("views", path.join(__dirname, "views"));

// Обработка POST-запросов из форм
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Запуск веб-сервера по адресу http://localhost:3000
app.listen(3000);

/**
 * Маршруты
  */


app.get("/", async (req, res) => {
    const { id } = req.params;
    const StorageOnProduct = await prisma.StorageOnProduct.findMany({})
    const storages = await prisma.Storages.findMany({})
    const products = await prisma.Products.findMany({})
    // console.log(StorageOnProduct[0])
    for(let i = 0; i < StorageOnProduct.length ; i ++){
        console.log("////////////////////////////////////////")
        console.log(StorageOnProduct[i])

        let location = Number(StorageOnProduct[i].storage_id)
    
        const storage1 = await prisma.Storages.findMany({
            where:{
                id:location
            },
            select:{
                locations:{
                    select:{
                        title:true,
                        id:true
                    }
                }
            }
        })
        console.log('location_id' + " " + storage1[0].locations.id)
        console.log('location_title' + " " + storage1[0].locations.title)
        console.log("////////////////////////////////////////")
    }

    res.render("home", {
        storages: storages,
        products:products
    });
});

app.get("/items/:id", async (req, res) => {
    const { id } = req.params;

    const item = await prisma.item.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            location: true,
            categories: {
                include: {
                    category: true,
                }
            },
        }
    });

    res.render("item", {
        item: (item) ? item : {},
    });
});

app.post("/create", async (req, res) => {
    let stArr1;
    let prArr2 = '';

    stArr1 = req.body.checkstorage

prArr2 = req.body.products_check
 

    for (let i = 0; i < prArr2.length; i++) {
        const StorageOnProduct =await  await prisma.StorageOnProduct.findMany({
            where:{
                storage_id: Number(stArr1),
                product_id: Number(prArr2[i])
            }
        })
        if(StorageOnProduct != undefined){
            await prisma.StorageOnProduct.create({
                data: {
                    storage_id: Number(stArr1),
                product_id: Number(prArr2[i])
                }
            })
        }
       

    }



    res.redirect("/");
});

app.post("/store", async (req, res) => {
    const { title } = req.body;

    await prisma.Storage.create({
        data: {
            title,
        }
    });

    res.redirect("/");
});

app.get('/example-m-n', async (req, res) => {
    await prisma.ItemRelCategory.create({
        data: {
            item_id: Number(1),
            category_id: Number(1),
        }
    });

    res.redirect("/");
});

app.get("/add", (req, res) => {
    res.render("add");
});
