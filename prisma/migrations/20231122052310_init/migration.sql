-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimetableSlots" (
    "SlotID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Day" TEXT NOT NULL,
    "TimeStart" TEXT NOT NULL,
    "TimeEnd" TEXT NOT NULL,
    "CourseCode" TEXT NOT NULL,
    CONSTRAINT "TimetableSlots_CourseCode_fkey" FOREIGN KEY ("CourseCode") REFERENCES "Courses" ("CourseCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimetableSlots" ("CourseCode", "Day", "SlotID", "TimeEnd", "TimeStart") SELECT "CourseCode", "Day", "SlotID", "TimeEnd", "TimeStart" FROM "TimetableSlots";
DROP TABLE "TimetableSlots";
ALTER TABLE "new_TimetableSlots" RENAME TO "TimetableSlots";
CREATE INDEX "TimetableSlots_CourseCode_Index" ON "TimetableSlots"("CourseCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
