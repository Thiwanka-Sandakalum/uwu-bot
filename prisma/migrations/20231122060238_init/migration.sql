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
    "TimeStart" TEXT NOT NULL,
    "TimeEnd" TEXT NOT NULL,
    "CourseCode" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
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
(1,'Monday', '10:00:00', '12:00:00', 'ICT 141-3' , "TLH1 - Technology Lecture Hall 1"),
(2,'Monday', '09:00:00', '10:00:00', 'ICT 132-2' , "TLH1 - Technology Lecture Hall 1"),


-- Tuesday 

(3,'Tuesday', '08:00:00', '09:00:00', 'ESD 161-1' , "MLT - Main Lecture Hall"),
(4,'Tuesday', '10:00:00', '12:00:00', 'ICT 132-2' , "CAD/CAM - CAD/CAM Laboratory"),
(5,'Tuesday', '13:00:00', '16:00:00', 'ICT 133-3' , "TLH1 - technology Lecture Hall 1"),

-- Wednesday 

(6,'Wednesday', '10:00:00', '12:00:00', 'ICT 101-2' , "TLH1 - technology Lecture Hall 1"),
(7,'Wednesday', '13:00:00', '15:00:00', 'ICT 131-3' , "TLH1 - technology Lecture Hall 1"),

-- Thursday 

(8,'Thursday', '08:00:00', '10:00:00', 'ESD 151-1' , "MLT - Main Lecture Hall"),
(9,'Thursday', '10:00:00', '12:00:00', 'LIBRARY HOURS' , "Library"),
(10,'Thursday', '13:00:00', '15:00:00', 'ICT 131-3' , "CAD/CAM - CAD/CAM Laboratory"),

-- Friday

(11,'Friday', '08:00:00', '09:00:00', 'ESD 121-1' , "MLT - Main Lecture Hall"),
(12,'Friday', '13:00:00', '16:00:00', 'ICT 141-3' , "PHY LAB - Physics Laboratory");