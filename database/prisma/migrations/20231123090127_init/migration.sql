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
    "Email" TEXT,
    "Hostel" TEXT,
    "PhoneNumber" TEXT,
    "TelegramID" TEXT
);

-- CreateIndex
CREATE INDEX "TimetableSlots_CourseCode_Index" ON "TimetableSlots"("CourseCode");




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

INSERT INTO Students VALUES
('UWU/ICT/22/003' , 'Ms.Rathnasiri R.D.L.M.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/005' , 'Mr.Dayarathna D.M.D.D.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/006' , 'Mr.Rathnayaka R.M.T.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/007' , 'Mr.Sanjuka W.P.N.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/008' , 'Mr.Kariyawasam Y.A.U.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/009' , 'Mr.Pathirana R.P.K.R.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/010' , 'Mr.Pabasara E.A.D.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/011' , 'Mr. LakmalK.A.A.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/012' , 'Mr.Wijesekara R.S.C.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/013' , 'Mr.Randoll T.D.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/014' , 'Ms.Ranathunga H.L.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/015' , 'Ms. DeSilva D.S.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/016' , 'Ms. PereraK.H.D.M.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/017' , 'Ms.Buddini W.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/018' , 'Mr.Sandaruwan W.N.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/019' , 'Mr.Priyashan M.S.M.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/020' , 'Mr.Subashana G.A.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/021' , 'Mr.Jayasuriya J.A.C.L.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/022' , 'Mr.Menikpura M.D.S.H.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/023' , 'Mr.Umayangana K.G.H.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/024' , 'Mr.Dilshan B.L.D' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/025' , 'Mr.Prabhashwara P.S.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/026' , 'Mr.Sathruwan K.G.L.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/027' , 'Ms.Heshani Tkh' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/028' , 'Mr.Vimukthi K.W.K.C.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/029' , 'Mr.Rukshan W.P.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/030' , 'Mr.Rubasinghe S.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/031' , 'Mr.Randitha I.H.H.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/032' , 'Mr.Premathilaka G.N.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/033' , 'Mr.Lakshan K.A.A.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/034' , 'Ms.Sudasingha L.I.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/035' , 'Ms.Dahanayaka W.G.D.P.T.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/036' , 'Ms.Vithanage T.A.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/037' , 'Mr. GayanA.T.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/038' , 'Mr.Abeywickrama G.U.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/039' , 'Mr.Senarathna L.A.L.C.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/040' , 'Mr. K.P.Savindu Sathsara' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/041' , 'Mr.Himanga B.G.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/042' , 'Ms. NavodiM.A.D.T.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/043' , 'Ms.Sameepa W.B.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/044' , 'Mr.Gonawala J.M.T.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/045' , 'Ms.Thathsarani B.D.U.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/046' , 'Ms.Nimeshika K.A.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/047' , 'Ms.Ravihansi W.A.S.V.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/048' , 'Mr.Kiriella K.R.B.M.R.A.B.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/049' , 'Mr.Abesooriya W.A.P.D.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/050' , 'Ms.Wickramarathna T.A.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/051' , 'Mr.Dasanayaka D.D.M.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/052' , 'Mr. KumaraW.S.B.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/053' , 'Mr.Kawshalya M.G.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/054' , 'Ms.Mahalekam M.P.G.N.P.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/055' , 'Ms. ShamraM.N.F.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/056' , 'Ms.Weerasinghe P.G.S.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/057' , 'Mr.Abeykoon E.M.T.R.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/058' , 'Mr. GamageA.G.T.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/059' , 'Mr.Munasinghe N.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/060' , 'Mr. YapaY.M.D.P.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/061' , 'Mr.Dasanayake D.M.J.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/062' , 'Mr.Wanninayaka W.M.I.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/063' , 'Mr.Dilshan N.K.S.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/064' , 'Mr.Nishshanka N.M.L.S.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/065' , 'Ms.Malshani R.M.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/066' , 'Mr.Senarath R.M.K.A.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/067' , 'Mr.Wijesinghe W.R.A.K.D.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/068' , 'Mr. NirmalR.P.C.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/069' , 'Mr.Aluwihare W.B.W.R.M.M.S' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/070' , 'Mr. AmharT.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/071' , 'Ms.Pramudika J.A.H.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/072' , 'Mr.Dilakshan R.M.I.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/073' , 'Mr.Abesingha A.H.M.R.L.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/074' , 'Ms.Wijesingha A.T.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/075' , 'Ms.Hathurusingha H.M.P.M.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/076' , 'Mr.Vijesingha N.M.D.W.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/077' , 'Ms. HerathH.M.S.H.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/078' , 'Ms.Jayathunga N.G.T.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/079' , 'Mr.Wanasinghe W.M.S.D.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/080' , 'Ms. AponsuC.R.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/081' , 'Ms.Chathurika R.G.D.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/082' , 'Mr.Bandara P.G.T.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/083' , 'Ms.Hansamala R.A.P.K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/084' , 'Ms.Sanofer H.N.H.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/085' , 'Mr. LakmalR.A.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/086' , 'Mr.Bandara K.M.P.M.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/087' , 'Ms. HerathH.M.P.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/088' , 'Ms.Dissanayaka D.M.A.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/089' , 'Mr.Dheerendra L.A.M.U.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/090' , 'Mr.Kariyawasam C.M.L.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/091' , 'Mr.Dissanayake D.M.T.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/092' , 'Ms. HerathH.M.A.S.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/093' , 'Ms. ShibraM.A.J.F.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/094' , 'Ms. ShowmyR.F.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/095' , 'Mr.Chanuuj N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/096' , 'Mr.Vithushan R.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/097' , 'Mr.Sinthujan K.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/098' , 'Ms.Ransika P.K.N.' , NULL , NULL, NULL , NULL),
('UWU/ICT/22/099' , 'Mr. PereraS.A.C.B.' , NULL , NULL, NULL , NULL),
('UWU/ICT/21/048' , 'Mr.Tharuka H.V.R.' , NULL , NULL, NULL , NULL);