-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 31, 2018 at 09:26 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Alphabet`
--
CREATE DATABASE IF NOT EXISTS `Alphabet` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `Alphabet`;

-- --------------------------------------------------------

--
-- Table structure for table `Group`
--

CREATE TABLE `Group` (
  `idGroup` int(11) NOT NULL,
  `Group_Name` varchar(45) DEFAULT NULL,
  `Rating_idRating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Group`
--

INSERT INTO `Group` (`idGroup`, `Group_Name`, `Rating_idRating`) VALUES
(1, 'Grade 1A', 1),
(2, 'Grade 1B', 1),
(3, 'Grade 3', 3),
(4, 'Grade 4', 4),
(5, 'Grade 5', 5),
(6, 'Grade 6', 6),
(7, 'Grade 7', 7),
(8, 'Grade 8', 8),
(9, 'Grade 9', 9),
(10, 'Grade 10', 10),
(11, 'Grade 11', 11),
(12, 'Grade 12', 12),
(13, 'Grade 2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Person`
--

CREATE TABLE `Person` (
  `idPerson` int(11) NOT NULL,
  `Username` varchar(45) DEFAULT NULL,
  `First_Name` varchar(45) DEFAULT NULL,
  `Last_Name` varchar(45) DEFAULT NULL,
  `Password` varchar(256) NOT NULL,
  `salt` varchar(16) DEFAULT NULL,
  `Parent_Person_ID` int(11) DEFAULT NULL,
  `Group_idGroup` int(11) NOT NULL,
  `Role_idRole` int(11) NOT NULL,
  `Rating_idRating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Person`
--

INSERT INTO `Person` (`idPerson`, `Username`, `First_Name`, `Last_Name`, `Password`, `salt`, `Parent_Person_ID`, `Group_idGroup`, `Role_idRole`, `Rating_idRating`) VALUES
(1, 'cs_coordinator', 'Computer Science', 'Coordinator', 'testtest', 'Y1HJj04rjJlHtDyD', NULL, 11, 1, 100),
(2, 'cs_teacher01', 'Computer Science', 'Teacher1', 'testtest', '5GjthBm5CU1ktOiy', 1, 11, 2, 100),
(3, 'cs_teacher02', 'Computer Science', 'Teacher2', 'test', 'My4KosOxDQAzHUXm', 1, 11, 2, 100),
(4, 'cs_student01', 'Computer Science', 'Student1', 'test', 'ZzGcQZ7etb9ahRbW', 2, 7, 3, 7),
(5, 'cs_student02', 'Computer Science', 'Student2', 'test', 'AaIIRB4iUCVSJN9r', 2, 7, 3, 7),
(6, 'cs_student03', 'Computer Science', 'Student3', 'test', 'IXoKvZffjWH8ydQH', 3, 5, 3, 5),
(7, 'cs_student04', 'Computer Science', 'Student4', 'testtest', 'REvIDVqFkKHhj05W', 3, 5, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Person_Skill_Progress`
--

CREATE TABLE `Person_Skill_Progress` (
  `idPerson_Skill_Progress` int(11) NOT NULL,
  `Skill_idSkill` int(11) NOT NULL,
  `Person_idPerson` int(11) NOT NULL,
  `Progress_idProgress` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Person_Skill_Progress`
--

INSERT INTO `Person_Skill_Progress` (`idPerson_Skill_Progress`, `Skill_idSkill`, `Person_idPerson`, `Progress_idProgress`) VALUES
(1, 23, 7, 2),
(2, 23, 6, 2),
(3, 1, 7, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Practice`
--

CREATE TABLE `Practice` (
  `idPractice` int(11) NOT NULL,
  `Description` varchar(45) DEFAULT NULL,
  `Skill_idSkill` int(11) NOT NULL,
  `Practice_Stage_idPractice_Stage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Practice_Stage`
--

CREATE TABLE `Practice_Stage` (
  `idPractice_Stage` int(11) NOT NULL,
  `Stage` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Progress`
--

CREATE TABLE `Progress` (
  `idProgress` int(11) NOT NULL,
  `Progress` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Progress`
--

INSERT INTO `Progress` (`idProgress`, `Progress`) VALUES
(1, 'Warming Up!'),
(2, 'Took Course'),
(3, 'Start Evaluation'),
(4, 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `Rating`
--

CREATE TABLE `Rating` (
  `idRating` int(11) NOT NULL,
  `Rating` int(11) NOT NULL,
  `Rating_Description` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Rating`
--

INSERT INTO `Rating` (`idRating`, `Rating`, `Rating_Description`) VALUES
(1, 1, 'Rating 1'),
(2, 2, 'Rating 2'),
(3, 3, 'Rating 3'),
(4, 4, 'Rating 4'),
(5, 5, 'Rating 5'),
(6, 6, 'Rating 6'),
(7, 7, 'Rating 7'),
(8, 8, 'Rating 8'),
(9, 9, 'Rating 9'),
(10, 10, 'Rating 10'),
(11, 11, 'Rating 11'),
(12, 12, 'Rating 12'),
(100, 0, 'Not Applicable');

-- --------------------------------------------------------

--
-- Table structure for table `Role`
--

CREATE TABLE `Role` (
  `idRole` int(11) NOT NULL,
  `Role_Name` varchar(45) DEFAULT NULL,
  `Role_Code` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Role`
--

INSERT INTO `Role` (`idRole`, `Role_Name`, `Role_Code`) VALUES
(1, 'Coordinator', 'ADMIN'),
(2, 'Teacher', 'MANAGER'),
(3, 'Student', 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `Skill`
--

CREATE TABLE `Skill` (
  `idSkill` int(11) NOT NULL,
  `Skill_Name` varchar(45) DEFAULT NULL,
  `Skill_Description` tinytext,
  `Parent_Skill_ID` int(11) DEFAULT NULL,
  `Date_Created` datetime DEFAULT NULL,
  `Person_idPerson` int(11) NOT NULL,
  `Rating_idRating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Skill`
--

INSERT INTO `Skill` (`idSkill`, `Skill_Name`, `Skill_Description`, `Parent_Skill_ID`, `Date_Created`, `Person_idPerson`, `Rating_idRating`) VALUES
(1, 'Basic Technology Skill', NULL, 0, '0000-00-00 00:00:00', 2, 2),
(2, 'Operating Systems: Microsoft Windows ', NULL, 0, '0000-00-00 00:00:00', 2, 2),
(3, 'Email Communication', NULL, 0, '0000-00-00 00:00:00', 2, 2),
(4, 'Keyboarding: Typing.com', 'Typing Lessons: Focus on typing accuracy, proper finger placment, not speed. Speed will be acquired naturally over time in the future months and years of typing lessons.', 0, '0000-00-00 00:00:00', 2, 2),
(5, 'Microsoft Powerpoint', NULL, 0, '0000-00-00 00:00:00', 2, 2),
(6, 'Microsoft Excel: The Basics', NULL, 0, '0000-00-00 00:00:00', 2, 2),
(7, 'Hardware', NULL, 1, '0000-00-00 00:00:00', 2, 2),
(8, 'Mouse Discovery', NULL, 1, '0000-00-00 00:00:00', 2, 2),
(9, 'Keyboard Discovery', NULL, 1, '0000-00-00 00:00:00', 2, 2),
(10, 'Screen', NULL, 1, '0000-00-00 00:00:00', 2, 2),
(11, 'Central Processing Unit', NULL, 1, '0000-00-00 00:00:00', 2, 2),
(12, 'Desktop', NULL, 2, '0000-00-00 00:00:00', 2, 2),
(13, 'Mail', NULL, 3, '0000-00-00 00:00:00', 2, 2),
(14, 'Address Book', NULL, 3, '0000-00-00 00:00:00', 2, 2),
(15, 'Settings', NULL, 3, '0000-00-00 00:00:00', 2, 2),
(16, 'Composing', NULL, 13, '0000-00-00 00:00:00', 2, 2),
(17, 'Replying', NULL, 13, '0000-00-00 00:00:00', 2, 2),
(18, 'Contacts', NULL, 14, '0000-00-00 00:00:00', 2, 2),
(19, 'Identities', NULL, 15, '0000-00-00 00:00:00', 2, 2),
(20, 'Typing position: Technique and Posture', NULL, 4, '0000-00-00 00:00:00', 2, 2),
(21, 'The Home Row', NULL, 4, '0000-00-00 00:00:00', 2, 2),
(22, 'Practicing Typing for Beginners', NULL, 4, '0000-00-00 00:00:00', 2, 2),
(23, 'Test', 'This is a test', 0, '2018-05-23 09:42:48', 2, 5),
(24, 'Test', 'This is a test with jwy', 3, '2018-05-23 11:01:22', 2, 1),
(25, 'Test', 'This is a test', 4, '2018-05-23 11:26:39', 2, 2),
(26, 'Test', 'Testing Jwt Authentication', 3, '2018-05-23 11:26:39', 3, 2),
(27, 'Test', 'User Test', 2, '2018-05-23 11:26:39', 3, 1),
(28, 'Test', 'Getting User ID', 1, '2018-05-23 11:39:10', 3, 2),
(29, 'Test', 'This is a test', 0, '2018-05-23 11:46:16', 1, 2),
(30, 'Root Test', 'Test', 0, '2018-05-23 12:06:56', 1, 2),
(31, 'Subskill', 'Test', 29, '2018-05-23 12:06:56', 1, 2),
(32, 'Test', 'This is a test', 4, '2018-05-24 16:22:29', 1, 2),
(33, 'Subsubskill', 'Testing', 31, '2018-05-29 11:45:28', 1, 4),
(34, 'Root', 'Test', 0, '2018-05-29 11:45:28', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Skill_Prerequesite_Skill`
--

CREATE TABLE `Skill_Prerequesite_Skill` (
  `idSkill_Prerequesite_Skill` int(11) NOT NULL,
  `Skill_idSkill` int(11) NOT NULL,
  `Skill_Prerequesiteid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Group`
--
ALTER TABLE `Group`
  ADD PRIMARY KEY (`idGroup`,`Rating_idRating`),
  ADD KEY `fk_Group_Rating1_idx` (`Rating_idRating`);

--
-- Indexes for table `Person`
--
ALTER TABLE `Person`
  ADD PRIMARY KEY (`idPerson`,`Group_idGroup`,`Role_idRole`,`Rating_idRating`),
  ADD UNIQUE KEY `Username_UNIQUE` (`Username`),
  ADD KEY `fk_Person_Group1_idx` (`Group_idGroup`),
  ADD KEY `fk_Person_Role1_idx` (`Role_idRole`),
  ADD KEY `fk_Person_Rating1_idx` (`Rating_idRating`);

--
-- Indexes for table `Person_Skill_Progress`
--
ALTER TABLE `Person_Skill_Progress`
  ADD PRIMARY KEY (`idPerson_Skill_Progress`,`Skill_idSkill`,`Person_idPerson`,`Progress_idProgress`),
  ADD KEY `fk_Person_Skill_Person1_idx` (`Person_idPerson`),
  ADD KEY `fk_Person_Skill_Skill1_idx` (`Skill_idSkill`),
  ADD KEY `fk_Person_Skill_Skill_Progress1_idx` (`Progress_idProgress`);

--
-- Indexes for table `Practice`
--
ALTER TABLE `Practice`
  ADD PRIMARY KEY (`idPractice`,`Skill_idSkill`,`Practice_Stage_idPractice_Stage`),
  ADD KEY `fk_Practice_Practice_Stage1_idx` (`Practice_Stage_idPractice_Stage`),
  ADD KEY `fk_Practice_Skill1_idx` (`Skill_idSkill`);

--
-- Indexes for table `Practice_Stage`
--
ALTER TABLE `Practice_Stage`
  ADD PRIMARY KEY (`idPractice_Stage`);

--
-- Indexes for table `Progress`
--
ALTER TABLE `Progress`
  ADD PRIMARY KEY (`idProgress`);

--
-- Indexes for table `Rating`
--
ALTER TABLE `Rating`
  ADD PRIMARY KEY (`idRating`);

--
-- Indexes for table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`idRole`);

--
-- Indexes for table `Skill`
--
ALTER TABLE `Skill`
  ADD PRIMARY KEY (`idSkill`,`Person_idPerson`,`Rating_idRating`),
  ADD KEY `fk_Category_Person1_idx` (`Person_idPerson`),
  ADD KEY `fk_Skill_Rating1_idx` (`Rating_idRating`);

--
-- Indexes for table `Skill_Prerequesite_Skill`
--
ALTER TABLE `Skill_Prerequesite_Skill`
  ADD PRIMARY KEY (`idSkill_Prerequesite_Skill`,`Skill_idSkill`),
  ADD KEY `fk_Skill_Prerequesite_Skill_Skill1_idx` (`Skill_idSkill`),
  ADD KEY `fk_Skill_Prerequesite_Skill_Prerequesite_Skill1_idx` (`Skill_Prerequesiteid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Person`
--
ALTER TABLE `Person`
  MODIFY `idPerson` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Person_Skill_Progress`
--
ALTER TABLE `Person_Skill_Progress`
  MODIFY `idPerson_Skill_Progress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Progress`
--
ALTER TABLE `Progress`
  MODIFY `idProgress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Skill`
--
ALTER TABLE `Skill`
  MODIFY `idSkill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
