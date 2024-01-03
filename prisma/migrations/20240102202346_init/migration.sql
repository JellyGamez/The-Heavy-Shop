/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CartToItem" DROP CONSTRAINT "_CartToItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToItem" DROP CONSTRAINT "_FavoritesToItem_B_fkey";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Item_id_seq";

-- AlterTable
ALTER TABLE "_CartToItem" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_FavoritesToItem" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_FavoritesToItem" ADD CONSTRAINT "_FavoritesToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToItem" ADD CONSTRAINT "_CartToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
