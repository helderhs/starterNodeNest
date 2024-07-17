/*
  Warnings:

  - The primary key for the `livros` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `livros` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `livros_authorId_fkey` ON `livros`;

-- AlterTable
ALTER TABLE `livros` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
