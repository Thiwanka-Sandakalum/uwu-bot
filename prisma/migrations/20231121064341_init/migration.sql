/*
  Warnings:

  - You are about to alter the column `TimeEnd` on the `TimetableSlots` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `TimeStart` on the `TimetableSlots` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimetableSlots" (
    "SlotID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Day" TEXT NOT NULL,
    "TimeStart" DATETIME NOT NULL,
    "TimeEnd" DATETIME NOT NULL,
    "CourseCode" TEXT NOT NULL,
    CONSTRAINT "TimetableSlots_CourseCode_fkey" FOREIGN KEY ("CourseCode") REFERENCES "Courses" ("CourseCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimetableSlots" ("CourseCode", "Day", "SlotID", "TimeEnd", "TimeStart") SELECT "CourseCode", "Day", "SlotID", "TimeEnd", "TimeStart" FROM "TimetableSlots";
DROP TABLE "TimetableSlots";
ALTER TABLE "new_TimetableSlots" RENAME TO "TimetableSlots";
CREATE INDEX "TimetableSlots_CourseCode_Index" ON "TimetableSlots"("CourseCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
