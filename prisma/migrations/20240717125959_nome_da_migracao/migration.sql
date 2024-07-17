-- DropIndex
DROP INDEX `livros_authorId_fkey` ON `livros`;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
