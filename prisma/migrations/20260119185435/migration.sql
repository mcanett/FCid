/*
  Warnings:

  - The values [TEENS,YOUTH,UNIVERSITY,SUPENDED,GRADUATED] on the enum `AdolescentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "AdolescentStage" AS ENUM ('TEENS', 'YOUTH', 'UNIVERSITY', 'GRADUATED');

-- AlterEnum
BEGIN;
CREATE TYPE "AdolescentStatus_new" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
ALTER TABLE "Adolescent" ALTER COLUMN "status" TYPE "AdolescentStatus_new" USING ("status"::text::"AdolescentStatus_new");
ALTER TYPE "AdolescentStatus" RENAME TO "AdolescentStatus_old";
ALTER TYPE "AdolescentStatus_new" RENAME TO "AdolescentStatus";
DROP TYPE "public"."AdolescentStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Adolescent" ADD COLUMN     "stage" "AdolescentStage" NOT NULL DEFAULT 'TEENS',
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
