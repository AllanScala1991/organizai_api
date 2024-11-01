/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Activities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Followers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Following` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activities_userId_key" ON "Activities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Followers_userId_key" ON "Followers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Following_userId_key" ON "Following"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Level_userId_key" ON "Level"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_userId_key" ON "Tasks"("userId");
