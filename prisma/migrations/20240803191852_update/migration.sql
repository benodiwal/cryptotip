/*
  Warnings:

  - You are about to drop the column `balance` on the `SolWallet` table. All the data in the column will be lost.
  - Added the required column `privateKey` to the `SolWallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `SolWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SolWallet" DROP COLUMN "balance",
ADD COLUMN     "privateKey" TEXT NOT NULL,
ADD COLUMN     "publicKey" TEXT NOT NULL;
