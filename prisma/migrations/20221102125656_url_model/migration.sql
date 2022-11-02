/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShortenedURL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Example`;

-- DropTable
DROP TABLE `ShortenedURL`;

-- CreateTable
CREATE TABLE `Url` (
    `id` VARCHAR(191) NOT NULL,
    `shortenUrl` VARCHAR(191) NOT NULL,
    `aliasOf` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
