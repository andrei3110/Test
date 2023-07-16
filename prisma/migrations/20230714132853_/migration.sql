/*
  Warnings:

  - You are about to drop the `stprageonproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `stprageonproduct` DROP FOREIGN KEY `StprageOnProduct_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `stprageonproduct` DROP FOREIGN KEY `StprageOnProduct_storage_id_fkey`;

-- DropTable
DROP TABLE `stprageonproduct`;

-- CreateTable
CREATE TABLE `StorageOnProduct` (
    `storage_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`storage_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StorageOnProduct` ADD CONSTRAINT `StorageOnProduct_storage_id_fkey` FOREIGN KEY (`storage_id`) REFERENCES `Storage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StorageOnProduct` ADD CONSTRAINT `StorageOnProduct_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
