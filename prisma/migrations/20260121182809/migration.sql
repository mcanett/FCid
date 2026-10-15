-- CreateEnum
CREATE TYPE "InactivationReason" AS ENUM ('ABSENCE', 'DISCIPLINARY', 'MANUAL');

-- CreateTable
CREATE TABLE "AdolescentInactivation" (
    "id" SERIAL NOT NULL,
    "adolescent_id" INTEGER NOT NULL,
    "inactive_from" TIMESTAMP(3) NOT NULL,
    "inactive_to" TIMESTAMP(3),
    "reason" "InactivationReason" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdolescentInactivation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdolescentInactivation" ADD CONSTRAINT "AdolescentInactivation_adolescent_id_fkey" FOREIGN KEY ("adolescent_id") REFERENCES "Adolescent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
