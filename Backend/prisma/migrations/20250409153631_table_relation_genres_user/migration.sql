-- CreateTable
CREATE TABLE "GenresFromUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GenresFromUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GenresFromUser" ADD CONSTRAINT "GenresFromUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresFromUser" ADD CONSTRAINT "GenresFromUser_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
