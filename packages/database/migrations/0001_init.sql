-- CreateTable
CREATE TABLE "models" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accessToken" TEXT NOT NULL,
    "publicUrl" TEXT,
    "name" TEXT,
    "description" TEXT,
    "fileUrl" TEXT,
    "fileHash" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "previewUrl" TEXT,
    "fileSize" INTEGER,
    "format" TEXT,
    "tags" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "models_accessToken_key" ON "models"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "models_publicUrl_key" ON "models"("publicUrl");
