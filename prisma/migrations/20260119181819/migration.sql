/*
  Warnings:

  - You are about to drop the column `state` on the `Adolescent` table. All the data in the column will be lost.
  - Added the required column `status` to the `Adolescent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdolescentStatus" AS ENUM ('TEENS', 'YOUTH', 'UNIVERSITY', 'SUPENDED', 'GRADUATED');

-- AlterTable
ALTER TABLE "Adolescent" DROP COLUMN "state",
ADD COLUMN     "status" "AdolescentStatus" NOT NULL;
