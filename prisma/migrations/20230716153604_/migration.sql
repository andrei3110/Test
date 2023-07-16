/*
  Warnings:

  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `storage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `storage` DROP FOREIGN KEY `Storage_location_id_fkey`;

-- DropForeignKey
ALTER TABLE `storageonproduct` DROP FOREIGN KEY `StorageOnProduct_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `storageonproduct` DROP FOREIGN KEY `StorageOnProduct_storage_id_fkey`;

-- DropTable
DROP TABLE `location`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `storage`;

-- CreateTable
CREATE TABLE `Storages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `location_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Storages` ADD CONSTRAINT `Storages_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StorageOnProduct` ADD CONSTRAINT `StorageOnProduct_storage_id_fkey` FOREIGN KEY (`storage_id`) REFERENCES `Storages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StorageOnProduct` ADD CONSTRAINT `StorageOnProduct_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
