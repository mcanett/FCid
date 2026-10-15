/*
  Warnings:

  - The values [FINANCE_MANAGER] on the enum `RoleType` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `user_id` on table `AdolescentEvent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_id` to the `CashCount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleType_new" AS ENUM ('ADMIN', 'LEAD', 'TREASURER', 'CAPTURATOR', 'VIEWER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "RoleType_new" USING ("role"::text::"RoleType_new");
ALTER TYPE "RoleType" RENAME TO "RoleType_old";
ALTER TYPE "RoleType_new" RENAME TO "RoleType";
DROP TYPE "public"."RoleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AdolescentEvent" DROP CONSTRAINT "AdolescentEvent_user_id_fkey";

-- AlterTable
ALTER TABLE "AdolescentEvent" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "CashCount" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AdolescentEvent" ADD CONSTRAINT "AdolescentEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashCount" ADD CONSTRAINT "CashCount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
