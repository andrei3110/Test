/*
  Warnings:

  - You are about to drop the column `location_id` on the `storages` table. All the data in the column will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `seller_id` to the `Storages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `storages` DROP FOREIGN KEY `Storages_location_id_fkey`;

-- AlterTable
ALTER TABLE `storages` DROP COLUMN `location_id`,
    ADD COLUMN `seller_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `locations`;

-- CreateTable
CREATE TABLE `Sellers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Storages` ADD CONSTRAINT `Storages_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `Sellers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
