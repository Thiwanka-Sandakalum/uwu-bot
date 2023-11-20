-- CreateTable
CREATE TABLE "Courses" (
    "CourseCode" TEXT NOT NULL PRIMARY KEY,
    "CourseName" TEXT NOT NULL,
    "LecturerName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TimetableSlots" (
    "SlotID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Day" TEXT NOT NULL,
    "TimeStart" DATETIME NOT NULL,
    "TimeEnd" DATETIME NOT NULL,
    "CourseCode" TEXT NOT NULL,
    CONSTRAINT "TimetableSlots_CourseCode_fkey" FOREIGN KEY ("CourseCode") REFERENCES "Courses" ("CourseCode") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Students" (
    "StudentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Hostel" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "TelegramID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Enrollments" (
    "EnrollmentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StudentID" INTEGER NOT NULL,
    "CourseCode" TEXT NOT NULL,
    CONSTRAINT "Enrollments_StudentID_fkey" FOREIGN KEY ("StudentID") REFERENCES "Students" ("StudentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollments_CourseCode_fkey" FOREIGN KEY ("CourseCode") REFERENCES "Courses" ("CourseCode") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "TimetableSlots_CourseCode_Index" ON "TimetableSlots"("CourseCode");

-- CreateIndex
CREATE INDEX "Enrollments_StudentID_Index" ON "Enrollments"("StudentID");

-- CreateIndex
CREATE INDEX "Enrollments_CourseCode_Index" ON "Enrollments"("CourseCode");



-- Inserting Course Data
INSERT INTO Courses VALUES
('ICT 101-2', 'Mathematics for ICT', 'Dr. G.G.N.T. Sandakelum (SL)'),
('ESD 121-1', 'English Language', 'Ms. H.H.S.U. Samarakoon (PL)'),
('ESD 151-1', 'Sinhala Language I', 'Ven. P. Wachissara Thero (SL)'),
('ESD 161-1', 'Tamil Language I', 'Mr. M. Rubavathanan (SL)'),
('ICT 131-3', 'Programming Techniques', 'Ms. W.B.M.S.C. Wijayakoon (PL)'),
('ICT 133-3', 'Computer Systems Organization', 'Mr. W.M.C.J.T. Kithulwatta (PL)'),
('ICT 141-3', 'Electronics for ICT', 'Mr. J.A.L. Naveendra (PL)');

-- -- Inserting Timetable Slot Data
-- INSERT INTO TimetableSlots VALUES
-- (1, 'Monday', '08:00:00', '09:00:00', 'ESD 161-1'),
-- (2, 'Monday', '09:00:00', '10:00:00', 'ESD 151-1');
