/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_favoritesId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "favoritesId";

-- CreateTable
CREATE TABLE "_FavoritesToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToItem_AB_unique" ON "_FavoritesToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToItem_B_index" ON "_FavoritesToItem"("B");

-- AddForeignKey
ALTER TABLE "_FavoritesToItem" ADD CONSTRAINT "_FavoritesToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToItem" ADD CONSTRAINT "_FavoritesToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
