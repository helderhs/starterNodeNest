/*
  Warnings:

  - You are about to drop the column `published` on the `livros` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `livros_authorId_fkey` ON `livros`;

-- AlterTable
ALTER TABLE `livros` DROP COLUMN `published`;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
