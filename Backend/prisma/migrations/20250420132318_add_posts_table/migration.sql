/*
  Warnings:

  - You are about to drop the `Genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresFromUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GenresFromUser" DROP CONSTRAINT "GenresFromUser_genreId_fkey";

-- DropForeignKey
ALTER TABLE "GenresFromUser" DROP CONSTRAINT "GenresFromUser_userId_fkey";

-- DropTable
DROP TABLE "Genres";

-- DropTable
DROP TABLE "GenresFromUser";

-- CreateTable
CREATE TABLE "GenreText" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GenreText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenreTextFromUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "genreTextId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GenreTextFromUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostGenreTexts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PostGenreTexts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "GenreText_name_key" ON "GenreText"("name");

-- CreateIndex
CREATE INDEX "_PostGenreTexts_B_index" ON "_PostGenreTexts"("B");

-- AddForeignKey
ALTER TABLE "GenreTextFromUser" ADD CONSTRAINT "GenreTextFromUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreTextFromUser" ADD CONSTRAINT "GenreTextFromUser_genreTextId_fkey" FOREIGN KEY ("genreTextId") REFERENCES "GenreText"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostGenreTexts" ADD CONSTRAINT "_PostGenreTexts_A_fkey" FOREIGN KEY ("A") REFERENCES "GenreText"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostGenreTexts" ADD CONSTRAINT "_PostGenreTexts_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
