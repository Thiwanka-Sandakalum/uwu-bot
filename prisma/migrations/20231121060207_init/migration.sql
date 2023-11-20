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
    "StudentID" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Hostel" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "TelegramID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Enrollments" (
    "EnrollmentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StudentID" TEXT NOT NULL,
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


INSERT INTO Courses VALUES
('ICT 101-2', 'Mathematics for ICT', 'Dr. G.G.N.T. Sandakelum (SL)'),
('ESD 121-1', 'English Language', 'Ms. H.H.S.U. Samarakoon (PL)'),
('ESD 151-1', 'Sinhala Language I', 'Ven. P. Wachissara Thero (SL)'),
('ESD 161-1', 'Tamil Language I', 'Mr. M. Rubavathanan (SL)'),
('ICT 131-3', 'Programming Techniques', 'Ms. W.B.M.S.C. Wijayakoon (PL)'),
('ICT 133-3', 'Computer Systems Organization', 'Mr. W.M.C.J.T. Kithulwatta (PL)'),
('ICT 141-3', 'Electronics for ICT', 'Mr. J.A.L. Naveendra (PL)'),
('ICT 132-2', 'NOT ASSIGNED', 'NOT ASSIGNED'),
('LIBRARY HOURS', 'LIBRARY HOURS', 'LIBRARY HOURS'),
('LUNCH BREAK', 'LUNCH BREAK', 'LUNCH BREAK');



INSERT INTO TimetableSlots VALUES
-- Monday
(1, 'Monday', '08:00:00', '09:00:00', 'ESD 161-1'),
(2, 'Monday', '09:00:00', '10:00:00', 'ESD 151-1'),
(3, 'Monday', '10:00:00', '11:00:00', 'ESD 121-1'),
(6, 'Monday', '13:00:00', '14:00:00', 'ICT 132-2'),
(7, 'Monday', '14:00:00', '15:00:00', 'ICT 133-3'),
(8, 'Monday', '15:00:00', '16:00:00', 'ICT 131-3'),

-- Tuesday
(9, 'Tuesday', '08:00:00', '09:00:00', 'ICT 141-3'),
(10, 'Tuesday', '09:00:00', '10:00:00', 'ICT 132-2'),
-- -- Tuesday
(11, 'Tuesday', '10:00:00', '11:00:00', 'ICT 133-3'),
(12, 'Tuesday', '11:00:00', '12:00:00', 'LIBRARY HOURS'),
(13, 'Tuesday', '12:00:00', '13:00:00', 'LUNCH BREAK'),
(14, 'Tuesday', '13:00:00', '14:00:00', 'ICT 132-2'),
(15, 'Tuesday', '14:00:00', '15:00:00', 'ICT 133-3'),
(16, 'Tuesday', '15:00:00', '16:00:00', 'ICT 131-3'),

-- Wednesday
(17, 'Wednesday', '08:00:00', '09:00:00', 'ESD 121-1'),
(18, 'Wednesday', '09:00:00', '10:00:00', 'ICT 101-2'),
(19, 'Wednesday', '10:00:00', '11:00:00', 'LIBRARY HOURS'),
(20, 'Wednesday', '11:00:00', '12:00:00', 'LUNCH BREAK'),
(21, 'Wednesday', '13:00:00', '14:00:00', 'ICT 133-3'),
(22, 'Wednesday', '14:00:00', '15:00:00', 'ICT 131-3'),
(23, 'Wednesday', '15:00:00', '16:00:00', 'ICT 131-3'),

-- Thursday
(24, 'Thursday', '08:00:00', '09:00:00', 'ESD 161-1'),
(25, 'Thursday', '09:00:00', '10:00:00', 'ICT 132-2'),
(26, 'Thursday', '10:00:00', '11:00:00', 'ICT 101-2'),
(27, 'Thursday', '11:00:00', '12:00:00', 'LIBRARY HOURS'),
(28, 'Thursday', '12:00:00', '13:00:00', 'LUNCH BREAK'),
(29, 'Thursday', '13:00:00', '14:00:00', 'ICT 132-2'),
(30, 'Thursday', '14:00:00', '15:00:00', 'ICT 133-3'),
(31, 'Thursday', '15:00:00', '16:00:00', 'ICT 131-3'),

-- Friday
(32, 'Friday', '08:00:00', '09:00:00', 'ICT 101-2'),
(33, 'Friday', '09:00:00', '10:00:00', 'ESD 151-1'),
(34, 'Friday', '10:00:00', '11:00:00', 'ESD 121-1'),
(37, 'Friday', '13:00:00', '14:00:00', 'ICT 132-2'),
(38, 'Friday', '14:00:00', '15:00:00', 'ICT 133-3'),
(39, 'Friday', '14:00:00', '15:00:00', 'ICT 141-3');