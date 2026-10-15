/*
  Warnings:

  - A unique constraint covering the columns `[first_name,last_name,birthdate]` on the table `Adolescent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'LEAD', 'FINANCE_MANAGER', 'CAPTURATOR', 'VIEWER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "RoleType" NOT NULL;

-- DropEnum
DROP TYPE "roleType";

-- CreateIndex
CREATE UNIQUE INDEX "Adolescent_first_name_last_name_birthdate_key" ON "Adolescent"("first_name", "last_name", "birthdate");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");
