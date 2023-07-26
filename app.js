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

    const storage = await prisma.Storages.findMany({
        include:{
            sellers:true,
            products:{
                include:{
                    products:true
                }
            }
        },
    })

    for(let i =0; i < storage.length; i ++){
        console.log("--------------------------")
        console.log(`storage: ${storage[i].title}`)
        console.log(`sellers: ${storage[i].sellers.title}`)
        for(let j = 0; j <storage[i].products.length;j ++){
            console.log(`products: ${storage[i].products[j].products.title}`)
        }
    }
// console.log(storage)
   
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