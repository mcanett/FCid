-- AlterTable
ALTER TABLE "AdolescentEvent" ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "AdolescentEvent" ADD CONSTRAINT "AdolescentEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
