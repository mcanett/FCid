-- CreateEnum
CREATE TYPE "roleType" AS ENUM ('ADMIN', 'LEAD', 'FINANCE_MANAGER', 'CAPTURATOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "ConditionType" AS ENUM ('DISEASE', 'ALLERGY', 'CONDITION', 'DISABILITY');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('FRIDAY_CLASS', 'SUNDAY_CLASS', 'CALENDAR_EVENT', 'CAMP', 'SPECIAL_EVENT');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('MXN', 'USD');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "roleType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adolescent" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "qr_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adolescent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdolescentTutor" (
    "id" SERIAL NOT NULL,
    "adolescent_id" INTEGER NOT NULL,
    "tutor_id" INTEGER NOT NULL,
    "relationship" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AdolescentTutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ConditionType" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdolescentCondition" (
    "id" SERIAL NOT NULL,
    "adolescent_id" INTEGER NOT NULL,
    "condition_id" INTEGER NOT NULL,
    "observations" TEXT,

    CONSTRAINT "AdolescentCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "presale_price" DECIMAL(10,2),
    "presale_expiration_date" TIMESTAMP(3),
    "price" DECIMAL(10,2),
    "exchange_rate_usd" DECIMAL(10,4),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdolescentEvent" (
    "id" SERIAL NOT NULL,
    "adolescent_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdolescentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "adolescent_event_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" "Currency" NOT NULL,
    "given_change" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashCount" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "cash_bottom" DECIMAL(12,2) NOT NULL,
    "total_amount" DECIMAL(12,2) NOT NULL,
    "total_change" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adolescent_qr_code_key" ON "Adolescent"("qr_code");

-- CreateIndex
CREATE UNIQUE INDEX "AdolescentTutor_adolescent_id_tutor_id_key" ON "AdolescentTutor"("adolescent_id", "tutor_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdolescentCondition_adolescent_id_condition_id_key" ON "AdolescentCondition"("adolescent_id", "condition_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdolescentEvent_adolescent_id_event_id_key" ON "AdolescentEvent"("adolescent_id", "event_id");

-- AddForeignKey
ALTER TABLE "AdolescentTutor" ADD CONSTRAINT "AdolescentTutor_adolescent_id_fkey" FOREIGN KEY ("adolescent_id") REFERENCES "Adolescent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdolescentTutor" ADD CONSTRAINT "AdolescentTutor_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdolescentCondition" ADD CONSTRAINT "AdolescentCondition_adolescent_id_fkey" FOREIGN KEY ("adolescent_id") REFERENCES "Adolescent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdolescentCondition" ADD CONSTRAINT "AdolescentCondition_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdolescentEvent" ADD CONSTRAINT "AdolescentEvent_adolescent_id_fkey" FOREIGN KEY ("adolescent_id") REFERENCES "Adolescent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdolescentEvent" ADD CONSTRAINT "AdolescentEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_adolescent_event_id_fkey" FOREIGN KEY ("adolescent_event_id") REFERENCES "AdolescentEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashCount" ADD CONSTRAINT "CashCount_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
