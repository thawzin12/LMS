-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2025 at 03:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `userdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(10) NOT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otpExpiry` datetime DEFAULT NULL,
  `school_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `email`, `name`, `password`, `otp`, `otpExpiry`, `school_name`) VALUES
(1, 'thawhtet077@gmail.com', 'Thaw Zin Htet', '$2b$10$g4WCdYPZ/UefPvuYKozwu.b8LrkoGJT61l7XZ1jujheY5RGSqyQzu', '998817', '2024-10-21 17:33:00', 'Magway Computer ');

-- --------------------------------------------------------

--
-- Table structure for table `choices`
--

CREATE TABLE `choices` (
  `choice_id` int(10) NOT NULL,
  `question_id` int(10) NOT NULL,
  `choice_text` varchar(255) DEFAULT NULL,
  `is_correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `choices`
--

INSERT INTO `choices` (`choice_id`, `question_id`, `choice_text`, `is_correct`) VALUES
(1, 1, 'piece of write', 1),
(2, 1, 'soften', 0),
(3, 2, 'noise', 1),
(4, 2, 'buy', 0),
(5, 3, 'nano', 0),
(6, 3, 'crypto', 1),
(7, 4, 'blue', 1),
(8, 4, 'purple', 0),
(9, 5, 'Honda fit', 0),
(10, 5, 'click', 1),
(11, 6, 'hightnano', 1),
(12, 6, 'blubo', 0),
(13, 7, 'sisto', 1),
(14, 7, 'hanzo', 0),
(143, 71, 'mono', 1),
(144, 71, 'history', 0),
(145, 72, 'was', 1),
(146, 72, 'is', 0),
(157, 78, 'Nano', 0),
(158, 78, 'crypto', 1),
(165, 82, 'nana', 1),
(166, 82, 'alcu', 0),
(167, 83, 'Designing a software', 0),
(168, 83, 'Testing a software', 0),
(169, 83, 'Application of engineering principles to the design a  software', 1),
(170, 84, 'Simplicity', 0),
(171, 84, 'Accessibility', 0),
(172, 84, 'Modularity', 1),
(173, 85, 'System Design Life Cycle', 0),
(174, 85, 'Software Design Life Cycle', 0),
(175, 85, 'Software Development Life Cycle', 1),
(176, 86, 'Watts S. Humphrey', 1),
(177, 86, 'Alan Turing', 0),
(178, 86, ' Margaret Hamilton ', 0),
(179, 87, 'Development ', 0),
(180, 87, 'Maintainability & functionality', 1),
(181, 87, 'Functionality ', 0),
(182, 88, 'datatransfer', 1),
(183, 88, 'data collection', 0),
(184, 88, 'data high', 0),
(185, 89, 'manner', 0),
(186, 89, 'collection', 1),
(187, 90, 'The dependent variable y should be of second order', 0),
(188, 90, 'Each coefficient does not depend on the independent variable', 1),
(189, 90, 'Each coefficient depends only on the independent variable', 0),
(190, 91, '7', 0),
(191, 91, '63', 1),
(192, 91, '9', 0),
(193, 91, '17', 0),
(194, 92, 'True', 1),
(195, 92, 'False', 0),
(196, 93, 'must be linearly', 0),
(197, 93, 'A must be invertible', 1),
(198, 93, 'b must be linearly independent of the columns of A', 0),
(199, 94, '1/2', 0),
(200, 94, '1/4', 1),
(201, 94, '3/4', 0),
(202, 94, '1', 0),
(203, 95, 'positive', 0),
(204, 95, 'real', 1),
(205, 95, 'negative', 0),
(206, 95, 'real and imaginary', 0),
(221, 101, 'Execute arithmetic operations', 0),
(222, 101, ' Direct the operation of the processor', 1),
(223, 101, 'Store data in memory', 0),
(224, 102, 'Cache memory', 1),
(225, 102, 'RAM', 0),
(226, 102, 'Hard disk', 0),
(227, 103, 'Variable-length instructions', 0),
(228, 103, 'Complex instruction set', 0),
(229, 103, 'Fewer instructions with simpler execution', 1),
(230, 104, 'Perform arithmetic and logical operations', 1),
(231, 104, 'Manage input/output operations', 0),
(232, 104, 'Store instructions', 0),
(233, 105, 'Executing multiple instructions at different stages simultaneously ', 1),
(234, 105, ' Increasing memory capacity', 0),
(235, 105, 'Reducing CPU clock speed', 0),
(236, 106, 'Immediate addressing mode', 0),
(237, 106, 'Direct addressing mode ', 1),
(238, 106, 'Indirect addressing mode', 0),
(239, 107, 'To build machines that can replicate human intelligence ', 1),
(240, 107, 'To increase computer processing speed', 0),
(241, 107, 'To develop new programming languages', 0),
(242, 108, 'Genetic algorithm', 0),
(243, 108, ' Decision tree', 1),
(244, 108, 'K-means clustering', 0),
(245, 109, 'Static model', 0),
(246, 109, 'Learning model ', 1),
(247, 109, 'Sequential model', 0),
(248, 110, 'A* search algorithm', 1),
(249, 110, 'Random search', 0),
(250, 110, 'Breadth-first search', 0),
(251, 111, 'A model that has low accuracy on training data', 0),
(252, 111, 'A model that performs well on training data but poorly on new data', 1),
(253, 112, 'Backpropagation', 0),
(254, 112, 'K-Nearest Neighbors', 0),
(255, 112, 'Principal Component Analysis', 1),
(256, 113, ' To understand the problem and requirements ', 1),
(257, 113, 'To test the software after development', 0),
(258, 113, 'To write the program code', 0),
(259, 114, 'Class diagram ', 1),
(260, 114, 'Activity diagram', 0),
(261, 114, 'Sequence diagram', 0),
(262, 115, 'Features the system must have to function correctly ', 1),
(263, 115, 'The hardware specifications of the system', 0),
(264, 115, ' Aesthetics of the user interface ', 0),
(265, 116, 'To describe the interactions between users and the system', 1),
(266, 116, 'To show the sequence of messages between objects', 0),
(267, 116, 'To design the database schema', 0),
(268, 117, 'Big-O notation', 0),
(269, 117, 'Inheritance', 1),
(270, 117, 'Syntax analysis', 0),
(271, 118, ' To store, retrieve, and manage data efficiently', 1),
(272, 118, 'To develop websites', 0),
(273, 118, 'To execute programs on a computer', 0),
(274, 119, ' MongoDB', 0),
(275, 119, ' MySQL ', 1),
(276, 120, 'It can have duplicate values', 0),
(277, 120, ' It uniquely identifies each row in the table', 1),
(278, 120, 'It can be NULL', 0),
(279, 121, ' Deletes a table from the database', 0),
(280, 121, 'Sorts the records in a table', 0),
(281, 121, 'Combines rows from two or more tables based on a related column', 1),
(282, 122, 'To ensure that data remains unique', 0),
(283, 122, 'To create a relationship between two tables ', 1),
(284, 122, 'To perform complex queries', 0),
(285, 123, 'Second Normal Form (2NF) ', 1),
(286, 123, ' Third Normal Form (3NF)', 0),
(287, 124, 'To improve the speed of data retrieval ', 1),
(288, 124, 'To restrict access to certain columns', 0),
(289, 124, 'To store additional metadata', 0),
(290, 125, 'neighbourhood', 0),
(291, 125, 'Leo Tolstoy', 0),
(292, 125, 'zone', 1),
(293, 125, 'outskirts', 0),
(294, 126, 'residence', 1),
(295, 126, 'Saturn', 0),
(296, 126, 'home', 0),
(297, 126, 'house', 0),
(298, 127, 'residence ', 0),
(299, 127, 'station', 0),
(300, 127, 'skyscraper', 1),
(301, 127, 'tower', 0),
(302, 128, 'habitat', 1),
(303, 128, 'station', 0),
(304, 128, 'cave', 0),
(305, 128, 'house', 0),
(306, 129, 'since', 0),
(307, 129, 'already', 0),
(308, 129, 'change', 0),
(309, 129, 'yet', 1),
(310, 130, 'The logical structure or blueprint of a database', 1),
(311, 130, 'A security layer for database access', 0),
(312, 130, 'The physical structure of the database', 0),
(313, 131, ' Network database model', 0),
(314, 131, 'Hierarchical database model ', 1),
(315, 131, 'Relational database model', 0),
(316, 132, ' A row or record in a table', 1),
(317, 132, ' A relationship between two tables', 0),
(318, 132, 'A column in a table', 0),
(319, 133, 'To group rows that have the same values into summary rows ', 1),
(320, 133, 'To join two tables together', 0),
(321, 133, ' To combine multiple tables into one', 0),
(322, 134, ' It sorts the results of a query', 0),
(323, 134, 'It limits the number of rows returned', 0),
(324, 134, ' It filters rows after the GROUP BY clause', 1),
(325, 135, 'cho', 0),
(326, 135, 'blue', 1),
(327, 136, 'red', 1),
(328, 136, 'ans', 0),
(329, 137, 'thaw', 0),
(330, 137, 'sou', 1),
(331, 138, 'hou', 0),
(332, 138, 'call', 1);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_code` varchar(200) NOT NULL,
  `course_name` varchar(200) NOT NULL,
  `grade_id` int(10) NOT NULL,
  `semester_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_code`, `course_name`, `grade_id`, `semester_id`) VALUES
('CS-2254', 'Web Technology, Java Script Programming', 2, 2),
('CS-3124', 'Software Analysis and Design', 3, 1),
('CS-3125', 'Database System Structure', 3, 1),
('CS-3156', 'Web Development PHP', 3, 1),
('CST(SS)-2205', 'J2EE Programming', 2, 2),
('CST-2211', 'Data Structure and Algorithms', 2, 2),
('CST-2223', 'Software Engineering', 2, 2),
('CST-2242', 'Linear Algebra', 2, 2),
('CST-3113', 'Artificial Intelligence', 3, 1),
('CST-3131', 'Computer Architecture & organization I', 3, 1),
('CST-3142', 'Numerical Analysis (Numerical Methods for Differential Equations', 3, 1),
('CST-3157', 'Financial Management and Accounting', 3, 1),
('E-2201', 'English', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `fid` int(10) NOT NULL,
  `feedbackcategory` varchar(225) NOT NULL,
  `feedback` text NOT NULL,
  `name` varchar(225) NOT NULL,
  `feedback_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`fid`, `feedbackcategory`, `feedback`, `name`, `feedback_date`) VALUES
(2, 'Other', 'What is the question?', 'Thu Thu Zin', '2024-09-04 11:23:40'),
(4, 'Other', 'Hiiiiii', 'Yi Su', '2024-09-06 11:28:32'),
(6, 'Other', 'sdjflsdjk', 'Thaw Zin', '2024-09-06 12:32:05'),
(8, 'Website Issue', '်ကြ့ါကငူ့်အသြူ', 'Zin Mar Than', '2024-09-06 12:44:53'),
(10, 'Website Issue', 'H4h4h', 'Hla Hla Win', '2024-09-06 13:13:24'),
(12, 'Other', 'Hight', 'Moe pa pa maung', '2024-09-06 14:08:40');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `grade_id` int(10) NOT NULL,
  `grade_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`grade_id`, `grade_name`) VALUES
(5, 'Fifth Year'),
(1, 'First Year'),
(4, 'Fourth Year'),
(2, 'Second Year'),
(3, 'Third Year');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `title_id` int(10) NOT NULL,
  `marks` int(10) NOT NULL,
  `teacher_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(10) NOT NULL,
  `title_id` int(10) NOT NULL,
  `question_text` varchar(200) NOT NULL,
  `marks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `title_id`, `question_text`, `marks`) VALUES
(1, 1, 'What is the letters?', 1),
(2, 1, 'What is handler?', 1),
(3, 2, 'What is the logic', 1),
(4, 3, 'What is the color of sky?', 2),
(5, 3, 'What is the model of car?', 1),
(6, 4, 'What is the pluto?', 1),
(7, 4, 'What is the jumbo?', 2),
(71, 47, 'What is the tobaco?', 2),
(72, 47, 'What is the length?', 1),
(78, 51, 'What is the tobacco?', 1),
(82, 55, 'Hello crypto', 1),
(83, 56, 'What is Software Engineering?', 2),
(84, 56, 'What are the features of Software Code?', 2),
(85, 56, 'What does SDLC stands for?', 1),
(86, 57, 'Who is the father of Software Engineering?', 2),
(87, 57, 'Attributes of good software is ____.', 2),
(88, 58, 'What is the data?', 3),
(89, 58, 'data structure?', 3),
(90, 59, 'Which one of the following is not a criterion for linearity of an equation?', 2),
(91, 59, 'The determinant of the matrix whose eigen values are 7, 1, 9 is given by ____', 3),
(92, 59, 'The sum of two symmetric matrices is also a symmetric matrix.', 1),
(93, 59, 'A set of linear equations is represented by the matrix equation Ax = b. The necessary condition for the existence of a solution for this system is', 4),
(94, 59, 'The system of linear equations (4d - 1)x +y + z = 0- y + z = 0(4d - 1) z = 0has a non-trivial solution, if d equals', 2),
(95, 59, 'Eigen values of a real symmetric matrix are always', 1),
(101, 61, 'What is the main function of the control unit in a CPU?', 3),
(102, 61, 'Which type of memory is the fastest in a computer system?\r\n\r\n ', 2),
(103, 61, 'Which of the following is a characteristic of RISC architecture?\r\n', 4),
(104, 61, 'What is the primary function of ALU (Arithmetic Logic Unit)?\r\n', 5),
(105, 61, 'What is meant by ‘pipelining’ in computer architecture?\r\n', 2),
(106, 61, 'Which addressing mode is used to directly specify the memory address in an instruction?\r\n', 1),
(107, 62, 'What is the main goal of Artificial Intelligence?\r\n\r\n', 2),
(108, 62, 'Which of the following is an example of a supervised learning algorithm?\r\n', 1),
(109, 62, 'What is the term for a model that improves its performance based on experience?\r\n', 4),
(110, 62, 'Which search algorithm is used to find the shortest path in a graph?\r\n', 1),
(111, 62, 'In machine learning, what is overfitting?\r\n\r\n', 3),
(112, 62, 'Which of the following is a technique for reducing dimensionality in data?\r\n', 3),
(113, 63, 'What is the primary objective of software analysis?\r\n', 3),
(114, 63, 'Which diagram is commonly used in object-oriented analysis and design to represent the structure of a system?\r\n ', 2),
(115, 63, 'What is meant by ‘functional requirements’ in software design?\r\n', 2),
(116, 63, 'What is the purpose of a use case diagram?\r\n', 3),
(117, 63, 'Which of the following is a design principle in object-oriented design?\r\n\r\n', 5),
(118, 64, 'What is the primary purpose of a database management system (DBMS)?\r\n', 5),
(119, 64, 'Which of the following is an example of a relational database?\r\n\r\n', 2),
(120, 64, 'What is the main feature of a primary key in a database table?\r\n\r\n', 3),
(121, 64, 'In SQL, what does the JOIN operation do?\r\n\r\n', 2),
(122, 64, 'What is a foreign key used for in relational databases?\r\n\r\n ', 2),
(123, 64, 'Which of the following normal forms is aimed at eliminating partial dependencies in a relational database?\r\n', 1),
(124, 64, 'What is the purpose of an index in a database?\r\n\r\n', 4),
(125, 65, 'When the teacher leaves, the classroom becomes a war ____ because the students go crazy.', 3),
(126, 65, 'Where is the location of your ____ ,sir?', 2),
(127, 65, 'The Sears Tower is one of the tallest ____ in the world.', 3),
(128, 65, 'I believe wild animals should live in their natural ____, not in zoos.', 1),
(129, 65, 'By winning the gold medal in the Olympics, he ____ worldwide recognition.', 3),
(130, 66, 'What does the term \'schema\' refer to in a database system?\r\n\r\n', 2),
(131, 66, 'Which type of database model organizes data in a tree-like structure?\r\n\r\n', 2),
(132, 66, 'In relational databases, what is a \'tuple\'?\r\n\r\n', 2),
(133, 66, 'What is the function of the SQL command GROUP BY?\r\n\r\n ', 4),
(134, 66, 'What does the HAVING clause do in SQL?\r\n\r\n', 1),
(135, 67, 'What is the color?', 2),
(136, 67, 'What is the question?', 4),
(137, 68, 'What is the random?', 2),
(138, 68, 'how many time?', 3);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_results`
--

CREATE TABLE `quiz_results` (
  `result_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `title_id` int(10) NOT NULL,
  `total_marks` int(11) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_results`
--

INSERT INTO `quiz_results` (`result_id`, `student_id`, `title_id`, `total_marks`, `duration`) VALUES
(1, 6, 1, 1, 16),
(2, 6, 2, 0, 11),
(4, 6, 3, 2, 15),
(5, 6, 4, 3, 47),
(6, 12, 6, 1, 11),
(7, 1, 5, 1, 26),
(8, 7, 7, 0, 29),
(9, 7, 12, 0, 18),
(10, 7, 10, 0, 17),
(11, 7, 8, 3, 12),
(12, 7, 16, 3, 9),
(13, 7, 15, 0, 11),
(14, 7, 9, 1, 8),
(15, 13, 56, 5, 44),
(16, 13, 57, 4, 22),
(17, 7, 58, 3, 51),
(18, 7, 47, 1, 9),
(19, 7, 51, 1, 32),
(21, 7, 49, 2, 11),
(23, 25, 66, 1, 36),
(24, 30, 62, 0, 79),
(25, 6, 62, 3, 29),
(26, 6, 67, 6, 16),
(27, 36, 67, 6, 20),
(28, 38, 67, 6, 30),
(29, 39, 67, 4, 4),
(30, 40, 67, 6, 16),
(31, 41, 67, 6, 16),
(32, 44, 67, 6, 11),
(33, 45, 67, 6, 19),
(34, 47, 68, 5, 5),
(35, 48, 68, 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `section_id` int(10) NOT NULL,
  `section_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`section_id`, `section_name`) VALUES
(1, 'Section A'),
(2, 'Section B'),
(3, 'Section C'),
(4, 'Section D'),
(5, 'Section E');

-- --------------------------------------------------------

--
-- Table structure for table `semester`
--

CREATE TABLE `semester` (
  `semester_id` int(11) NOT NULL,
  `semester_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester`
--

INSERT INTO `semester` (`semester_id`, `semester_name`) VALUES
(1, 'Semester 1'),
(2, 'Semester 2');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(10) NOT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otpExpiry` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `grade_id` int(10) NOT NULL,
  `semester_id` int(10) NOT NULL,
  `section_id` int(10) NOT NULL,
  `roll_number` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `email`, `name`, `password`, `otp`, `otpExpiry`, `created_at`, `updated_at`, `grade_id`, `semester_id`, `section_id`, `roll_number`) VALUES
(2, 'pyaephyoe@gmail.com', 'Pyae Phyoe', '$2b$10$7x.E.OgQ8h8sdDvX902FuuWRlSIsTzJtslCtAGfSioKhormILRgXi', NULL, NULL, '2024-08-29 02:52:21', '2024-09-06 07:06:17', 4, 2, 1, 'UCSMG-10279'),
(3, 'minlwin@gmail.com', 'MinLwin', '$2b$10$Nynw5cL5NmG8NmQB8hbQUOz9eu8mmgMjRAD8J0FvT5jW0.DNUmRI.', NULL, NULL, '2024-08-29 02:59:10', '2024-08-29 02:59:10', 2, 2, 1, 'UCSMG-10250'),
(5, 'pthura987@gmail.com', 'Phyo Thura Kyaw', '$2b$10$xWzs7jnz3Zo/5SS.DqX71eZYqeYFSMqsCVdbWLRWemLnshrBVq6Qa', NULL, NULL, '2024-08-29 09:00:30', '2024-09-06 07:07:10', 3, 2, 2, 'UCSMG-17175'),
(6, 'thtet3844@gmail.com', 'Thaw Zin', '$2b$10$NrajNJ0kYLVWH1AjKhRVVONQiFJupBx27pT0H0fVgAJQKoCewgfXi', NULL, NULL, '2024-08-29 14:24:35', '2024-09-05 17:35:19', 3, 1, 2, 'UCSMGY-10249'),
(7, 'thuthuzin23@gmail.com', 'Thu Thu Zin', '$2b$10$0/dNciraZVGOrvZCLf6x/uOLcf/tw21HL8o8.Rk6cYyYxa8nHchbC', NULL, NULL, '2024-08-30 05:40:42', '2024-08-30 05:40:42', 3, 1, 2, 'UCSMGY-10234'),
(8, 'waiphyokyaw12@gmail.com', 'Wai Phyoe Kyaw', '$2b$10$ayPY65fXQQs31m47ENxQde4ySw/t58cKxEP5wHYWPTQhoSyZnKaOG', NULL, NULL, '2024-08-30 05:46:53', '2024-08-30 05:46:53', 2, 2, 1, 'UCSMGY-10289'),
(9, 'minlwinko@gmail.com', 'Min Lwin Ko', '$2b$10$EADmhspFw7AbNYW6jBQVvertXQXK4HVd6At2sP4FAsyACXquBbiL2', NULL, NULL, '2024-08-30 05:52:15', '2024-08-30 05:52:15', 2, 2, 2, 'UCSMG-102874'),
(10, 'minlwinphyo@gmail.com', 'Min Lwin', '$2b$10$jq.k9p9YkL.UXWNaAbhBNeOSJ1I52Y8g3ll.WQtZl9aZnlOhE7eUW', NULL, NULL, '2024-08-30 06:30:57', '2024-08-30 06:30:57', 2, 2, 2, 'UCSMG-171564'),
(11, 'waiyan@gmail.com', 'Wai Yan Paing', '$2b$10$lSxEsdZEqz2ff/lBt3Vjsu6uOvQbhE40cHim8fxuvJ3uiVJTIwNUO', NULL, NULL, '2024-08-30 08:05:51', '2024-08-30 08:05:51', 2, 2, 1, 'UCSMG-10222'),
(12, 'min23@gmail.com', 'Min Lwin', '$2b$10$BeY5PH5o4lkJdhiTvU1myu8TU1vqOSfGisWVGdfRIal/ClcKv6/Ze', NULL, NULL, '2024-08-30 08:42:25', '2024-08-30 08:42:25', 2, 2, 2, 'UCSMGY-1027344'),
(13, 'pyaephyo2@gmail.com', 'Pyae Phyoe Thu', '$2b$10$CimJcZf2QqMNkxO8vJ6C/OOb5HMkDKt.WS4w1EqbKPrjdgIOqFU0S', NULL, NULL, '2024-09-04 01:27:38', '2024-09-04 01:27:38', 3, 1, 2, 'UCSMG-10241'),
(14, 'aung@gmail.com', 'Aung Aung', '$2b$10$iReRGKFnyhYXHFz/oQ9zTuNexwBvWSNABb/UbuyrbQazUZZLD4GHa', NULL, NULL, '2024-09-04 04:04:57', '2024-09-04 04:08:08', 4, 1, 1, 'UCSMG-10226'),
(15, 'naymyohtet21@gmail.com', 'Nay Myo Htet', '$2b$10$l3rxoJnEUtTU7ohWufQ8luvJpgq0hNbi1myRRfPUTt3LP51lNoDnK', NULL, NULL, '2024-09-04 16:06:41', '2024-09-04 16:06:41', 3, 1, 2, 'UCSMG-10248'),
(16, 'khinnyeinchanpyae2225@gmail.com', 'Khin Nyein Chan Pyae', '$2b$10$KoUP2yn7NuBAPPgSdUKTK.J3W2onJDTyNIl0V9zlZUFUHzrtMuZjK', NULL, NULL, '2024-09-05 09:24:56', '2024-09-05 09:32:52', 3, 1, 2, 'UCSMG-20130'),
(17, 'ingyin020303@gmail.com', 'Ingyin May', '$2b$10$0Ea9puE5coCdXQd8ravMw.P3y5O0T4lY1KGHN9IPR.Tu2ONLuU1bC', NULL, NULL, '2024-09-05 09:25:57', '2024-09-05 09:34:31', 3, 1, 2, 'UCSMG-20125'),
(18, 'heinminko2@gmail.com', 'Hein Ko', '$2b$10$NJariDUl5d5Jjb1tYaZyXuJt463Knyla7NaSHJWyBMt2/vDAJTfl.', NULL, NULL, '2024-09-05 11:06:09', '2024-09-05 11:06:09', 1, 1, 1, 'UCSMGY-102488'),
(19, 'hninwutyi@gmail.com', 'Hnin Wut Phyoe', '$2b$10$a.fBEFCVuP36IP6dZcu1Pe9N8nupXUsSDszleOEb1PL2v.h8gUq5S', NULL, NULL, '2024-09-05 12:36:54', '2024-09-05 12:36:54', 1, 2, 1, 'UCSMG-10242'),
(20, 'naychi23@gmail.com', 'Nay Chi Phyoe', '$2b$10$LOMjqJhEPy8oVwNRKirxbeY9S56WEdx6KSbdguy0E.M5URRrfDro2', NULL, NULL, '2024-09-05 12:38:23', '2024-09-05 12:38:23', 1, 2, 1, 'UCSMG-10244'),
(21, 'yuzana23@gmail.com', 'Yu Za Na', '$2b$10$BDVZ7IXwTf71nqkw79P5juhbzSlHDFAU8/N2wjuCEXQ6kFAqNT5iO', NULL, NULL, '2024-09-05 12:39:40', '2024-09-05 12:39:40', 2, 1, 1, 'UCSMG-17151'),
(22, 'thawthawzin12@gmail.com', 'Thaw Thaw Zin', '$2b$10$hIrdc2sCD02XL5xkl37wsumdS1XSp.Ej0ExCqNkNrnEnXFYqoK78u', NULL, NULL, '2024-09-05 12:41:08', '2024-09-05 12:41:08', 1, 1, 2, 'UCSMG-102478'),
(23, 'Yioqw@gmail.com', 'Yi Yi ', '$2b$10$INj2YTeSIEqR1DhDhJZuHuLbnJH3eT1ehV7Yz3s7q24MP95Cyb71u', NULL, NULL, '2024-09-05 12:42:43', '2024-09-05 12:42:43', 1, 1, 2, 'UCSMG-1778'),
(24, 'ayeayephyo205@gmail.com', 'Aye Aye Phyoe', '$2b$10$naUR4JOT3FKtHTS9Q1OnEekcI1zcy2YaZKlYsp4jtelhsMSMW86SK', NULL, NULL, '2024-09-05 17:44:12', '2024-09-05 17:44:12', 3, 1, 1, 'UCSMG-10243'),
(25, 'nini@gmail.com', 'Ni Ni', '$2b$10$E1ReMxnvgU5Url2iQCSGyugHBImuqTARoIml2hNm4Rmw.ZuBayohO', NULL, NULL, '2024-09-05 17:49:52', '2024-09-05 17:49:52', 3, 1, 1, 'UCSMG-102878'),
(26, 'kyawkyaw12@gmail.com', 'Kyaw Kyaw', '$2b$10$BU9eSwtVbDZce/dEQlvoyOfTNeca9lUElr4jlPC4zs.3UXOVBRq.y', NULL, NULL, '2024-09-05 17:56:15', '2024-09-05 17:56:15', 2, 2, 1, 'UCSMG-171512'),
(27, 'zawzaw34@gmail.com', 'Zaw Zaw', '$2b$10$m0vmWJjcrH05IJhikUirGeHqkvFq36O22ZCQQ48MaYWTSG9s45xpy', NULL, NULL, '2024-09-05 17:58:18', '2024-09-05 17:58:18', 2, 2, 2, 'UCSMG-171568'),
(28, 'heinthurazaw116d@gmail.com', 'aye moh moh zaw', '$2b$10$soxtk4sYilSc6pPLnt1KRuX3tUSap9KruaiEKHsjBGvqowbtdEJne', NULL, NULL, '2024-09-06 02:21:08', '2024-09-06 02:21:08', 3, 1, 2, 'UCSMG-17147'),
(29, 'minybae032@gmail.com', 'Yamin Shwe Sin', '$2b$10$m/3vEw6i7USyuA6Bt5WCeuOV8crpeUwe6x00iZrlCfN1En864UsnC', NULL, NULL, '2024-09-06 02:25:36', '2024-09-06 02:25:36', 3, 1, 2, 'UCSMG-20123'),
(30, 'tintinmyintaung043@gmail.com', 'Tin Tin', '$2b$10$lF4vINSpSXIYzndZ.XcjTedxoZtmWYdkXKMtCGaeXucJQ7jX5Jnk6', NULL, NULL, '2024-09-06 02:26:10', '2024-09-06 02:34:35', 3, 1, 2, 'UCSMG-20121'),
(31, 'opankankonly4gyingyin@gmail.com', 'Anh Htoo Aung', '$2b$10$RmAGRfzQKwiUS5d.d3hZnOLgXNrb9Rz4Qb2Goerh/Nb8g27laBt5q', NULL, NULL, '2024-09-06 02:33:48', '2024-09-06 02:33:48', 3, 1, 2, 'UCSMG-22213'),
(32, 'aungzinthaw543@gmail.com', 'Aung Zin thaw', '$2b$10$OKxXo2MoboMnrn3CoNs6LeKBEUI5gSX1rNzbYx.U6Aj7p4fI/ET8K', NULL, NULL, '2024-09-06 02:37:18', '2024-09-06 02:37:18', 3, 1, 2, 'UCSMG-22225'),
(33, 'phyomatt781@gmail.com', 'Phyo Myat Thu', '$2b$10$zCDCX5tAdH6YhVOBKCqRNOKQzZDBWziPASSgsb7WkaPBG4HQGk7y.', NULL, NULL, '2024-09-06 04:09:48', '2024-09-06 04:09:48', 3, 1, 2, 'UCSMG-102445'),
(34, 'aung394@gmail.com', 'aung aung', '$2b$10$R5jv9ukIiA3BxF.xVBEj4.XlohGCNsyVV2S46qEmfCrYrMbWNQh76', NULL, NULL, '2024-09-06 04:46:38', '2024-09-06 04:46:38', 3, 1, 2, '3cs34'),
(35, 'thetshweyisu@gmail.com', 'Yi Su', '$2b$10$PiW2QbCi8pkYqX5DT62JI.sNQDVHm4DNJMjbWPXBRt0RXHuWb0GP.', NULL, NULL, '2024-09-06 04:53:31', '2024-09-06 05:01:23', 3, 1, 2, 'UCSMG-17108'),
(36, 'haymankyaw191@gmail.com', 'Hay Man Kyaw', '$2b$10$Up2Wztq3hbITpeEU.01ILuIr33utYHEfDIjckSS02ziUzKMojinVe', NULL, NULL, '2024-09-06 05:13:25', '2024-09-06 05:24:42', 3, 1, 2, 'UCSMG-171576'),
(37, 'thet22paing@gmail.com', 'Thet paing', '$2b$10$o.HewelJEmMD/oYV508iD.CIjxUtOduRJ7Ren2IWeTHjN.mkRQdmC', NULL, NULL, '2024-09-06 05:29:08', '2024-09-06 05:34:53', 3, 1, 2, 'UCSMG-171589'),
(38, 'saungoomon8@gmail.com', 'Saung Oo mon', '$2b$10$1DJX1bUKn7943pD5aHF1z.AS8o/naZbmmWsNZV6ZIFPAkbv.rAmH2', NULL, NULL, '2024-09-06 05:41:11', '2024-09-06 05:41:11', 3, 1, 2, 'UCSMG-17157768'),
(39, 'wailin.maung.165@gmail.com', 'Wai Lin Maung', '$2b$10$qUiGDNbz.o6CkN.B/s.dL.IHQmYjn6Wmx0OQ4jhoj8m.aS19HwGQS', '499008', '2024-09-06 12:35:16', '2024-09-06 05:51:20', '2024-09-06 05:55:16', 3, 1, 2, 'UCSMG-102778'),
(40, 'zinmarthan55050@gmail.com', 'Zin Mar Than', '$2b$10$fiNunokC0yn1.WVQnM9YVOze9dmP4t9xllotvHfoMzdZWD5UWNa9m', NULL, NULL, '2024-09-06 06:10:44', '2024-09-06 06:20:11', 3, 1, 2, 'UCSMG-10277867'),
(41, 'hlahlawin324@gmail.com', 'Hla Hla Win', '$2b$10$6JNFQEFAV6Q.HNi8zsq5BO8NQx01MGQbBLic/t2FL25Hy2.bDIRlq', NULL, NULL, '2024-09-06 06:39:08', '2024-09-06 06:48:02', 3, 1, 2, 'UCSMGY-1028987'),
(42, 'maisheensheen@gmail.com', 'Sheen Thung', '$2b$10$QE6xSYJ5VjzByDNJU1VjBO3n3FXrFdu0lPgyZA5bPH0MYKVieGKfm', NULL, NULL, '2024-09-06 06:45:19', '2024-09-06 06:45:19', 3, 1, 2, '3CS-2'),
(43, 'Aye@gmail.com', 'Aye Aye Phyoe', '$2b$10$DDQeSPW3JbZYyjkHK.H27.vfKeLRXrwn3rmPksMHvXi4e1O8GU6GW', NULL, NULL, '2024-09-06 06:51:08', '2024-09-06 06:51:08', 3, 1, 2, '3CS-4'),
(44, 'moemoekhaing24923@gmail.com', 'Moe Moe Khaing', '$2b$10$FV0T0ADp6q12Op0/LpS1TO8X212HXUwXIKnDBaLmVqmOJy9Um6TBS', '757672', '2024-09-06 13:35:49', '2024-09-06 06:51:16', '2024-09-06 06:55:49', 3, 1, 2, 'UCSMG-171578'),
(45, 'ayeayephyo908@gmail.com', 'Aye Aye Phyoe', '$2b$10$jgu2QhTIeKUFsMdAnucs8u3jRmd7QWPTMlAkQE5Fw5K3Rl5G4s1HG', NULL, NULL, '2024-09-06 06:54:33', '2024-09-06 06:54:33', 3, 1, 2, '3CS-8'),
(46, 'phuewintwar361@gmail.com', 'Wint War Phu', '$2b$10$fumY2zhy3C2t6P5ULA.fru.Gd8vuoMpBxF4SwN9FEEZn7TsTAx436', NULL, NULL, '2024-09-06 07:17:32', '2024-09-06 07:19:44', 3, 1, 2, 'Ucsmgy-5778'),
(47, 'waiyanunimgy@gmail.com', 'Wai Yan', '$2b$10$BDo8KAaPgVt5T2VdYGlBt.xBSkXk5m7wMXtI3P1p5b4Pd44GtdS5a', NULL, NULL, '2024-09-06 07:24:24', '2024-09-06 07:27:32', 3, 1, 2, 'Ucsmgy-5775778'),
(48, 'moepapamaung0@gmail.com', 'Moe pa pa maung', '$2b$10$D4dQvHSvyqAEtqIJb02BPeLJ8Jvdz/Pb47QziqlqrVH09n6o1MYiy', NULL, NULL, '2024-09-06 07:35:46', '2024-09-06 07:50:29', 3, 1, 2, 'UCSMG-17157766'),
(49, 'zarniyeetway123@gmail.com', 'Zin min Htet', '$2b$10$0UUcMJ6aV.w69sMjqdm4Se1t58vvMacRddl.EosOzG6Ss0rSmmMtq', '257134', '2024-10-21 18:17:28', '2024-10-21 11:01:33', '2024-10-21 11:37:28', 3, 1, 2, 'ucsmgy-21');

-- --------------------------------------------------------

--
-- Table structure for table `student_answers`
--

CREATE TABLE `student_answers` (
  `answer_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `question_id` int(10) NOT NULL,
  `choice_id` int(10) NOT NULL,
  `title_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_answers`
--

INSERT INTO `student_answers` (`answer_id`, `student_id`, `question_id`, `choice_id`, `title_id`) VALUES
(1, 6, 1, 2, 1),
(2, 6, 2, 3, 1),
(3, 6, 3, 5, 2),
(4, 6, 3, 5, 2),
(5, 6, 5, 9, 3),
(6, 6, 4, 7, 3),
(7, 6, 7, 13, 4),
(8, 6, 6, 11, 4),
(9, 12, 10, 22, 6),
(10, 12, 11, 23, 6),
(11, 1, 9, 19, 5),
(12, 1, 8, 16, 5),
(13, 7, 12, 25, 7),
(14, 7, 23, 48, 12),
(15, 7, 22, 45, 12),
(16, 7, 18, 37, 10),
(17, 7, 19, 40, 10),
(18, 7, 15, 31, 8),
(19, 7, 14, 30, 8),
(20, 7, 31, 63, 16),
(21, 7, 30, 62, 16),
(22, 7, 29, 60, 15),
(23, 7, 28, 57, 15),
(24, 7, 17, 35, 9),
(25, 7, 16, 33, 9),
(26, 13, 84, 172, 56),
(27, 13, 83, 169, 56),
(28, 13, 85, 175, 56),
(29, 13, 87, 180, 57),
(30, 13, 86, 176, 57),
(31, 7, 88, 183, 58),
(32, 7, 89, 186, 58),
(33, 7, 71, 144, 47),
(34, 7, 72, 145, 47),
(35, 7, 78, 158, 51),
(36, 7, 78, 158, 51),
(37, 7, 75, 151, 49),
(38, 7, 76, 154, 49),
(39, 7, 75, 151, 49),
(40, 7, 76, 154, 49),
(41, 25, 130, 312, 66),
(42, 25, 133, 321, 66),
(43, 25, 134, 324, 66),
(44, 25, 131, 315, 66),
(45, 25, 132, 317, 66),
(46, 30, 107, 241, 62),
(47, 30, 109, 245, 62),
(48, 30, 112, 253, 62),
(49, 30, 111, 251, 62),
(50, 30, 110, 249, 62),
(51, 30, 108, 242, 62),
(52, 6, 109, 245, 62),
(53, 6, 111, 251, 62),
(54, 6, 110, 248, 62),
(55, 6, 108, 244, 62),
(56, 6, 107, 239, 62),
(57, 6, 112, 253, 62),
(58, 6, 135, 326, 67),
(59, 6, 136, 327, 67),
(60, 36, 135, 326, 67),
(61, 36, 136, 327, 67),
(62, 38, 136, 327, 67),
(63, 38, 135, 326, 67),
(64, 39, 136, 327, 67),
(65, 39, 135, 325, 67),
(66, 40, 136, 327, 67),
(67, 40, 135, 326, 67),
(68, 41, 135, 326, 67),
(69, 41, 136, 327, 67),
(70, 44, 136, 327, 67),
(71, 44, 135, 326, 67),
(72, 45, 135, 326, 67),
(73, 45, 136, 327, 67),
(74, 47, 137, 330, 68),
(75, 47, 138, 332, 68),
(76, 48, 137, 329, 68),
(77, 48, 138, 332, 68);

-- --------------------------------------------------------

--
-- Table structure for table `taught`
--

CREATE TABLE `taught` (
  `id` int(10) NOT NULL,
  `teacher_id` int(10) NOT NULL,
  `course_code` varchar(200) DEFAULT NULL,
  `grade_id` int(10) NOT NULL,
  `semester_id` int(10) DEFAULT NULL,
  `section_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taught`
--

INSERT INTO `taught` (`id`, `teacher_id`, `course_code`, `grade_id`, `semester_id`, `section_id`) VALUES
(7, 4, 'CST-3142', 3, 1, 1),
(9, 5, 'CST-3113', 3, 1, 1),
(10, 5, 'CST-3113', 3, 1, 2),
(12, 7, 'CST-3131', 3, 1, 1),
(13, 7, 'CST-3131', 3, 1, 2),
(14, 8, 'CST-3157', 3, 1, 1),
(15, 8, 'CST-3157', 3, 1, 2),
(16, 9, 'CS-3156', 3, 1, 1),
(17, 9, 'CS-3156', 3, 1, 2),
(18, 10, 'CS-3125', 3, 1, 1),
(19, 10, 'CS-3125', 3, 1, 2),
(20, 11, 'E-2201', 2, 2, 1),
(21, 11, 'E-2201', 2, 2, 2),
(22, 11, 'E-2201', 2, 2, 3),
(23, 12, 'CST-2242', 2, 2, 1),
(24, 12, 'CST-2242', 2, 2, 2),
(26, 13, 'CST-2211', 2, 2, 1),
(27, 13, 'CST-2211', 2, 2, 2),
(28, 13, 'CST-2211', 2, 2, 3),
(29, 14, 'CST-2223', 2, 2, 1),
(30, 14, 'CST-2223', 2, 2, 2),
(31, 14, 'CST-2223', 2, 2, 3),
(32, 15, 'CS-2254', 2, 2, 1),
(33, 15, 'CS-2254', 2, 2, 2),
(34, 15, 'CS-2254', 2, 2, 3),
(35, 16, 'CST(SS)-2205', 2, 2, 1),
(36, 16, 'CST(SS)-2205', 2, 2, 2),
(37, 16, 'CST(SS)-2205', 2, 2, 3),
(38, 10, 'CST-2242', 2, 2, 1),
(39, 10, 'CST-2242', 2, 2, 2),
(40, 13, 'CST-2242', 2, 2, 1),
(41, 6, 'CS-3124', 3, 1, 2),
(42, 18, 'CS-3124', 3, 1, 2),
(43, 19, 'CS-3125', 3, 1, 1),
(44, 19, 'CS-3125', 3, 1, 2),
(45, 4, 'CST-3142', 3, 1, 2),
(46, 5, 'CS-3124', 3, 1, 1),
(47, 5, 'CS-3124', 3, 1, 2),
(48, 8, 'CST-3157', 3, 1, 3),
(49, 13, 'CS-3156', 3, 1, 1),
(50, 13, 'CS-3156', 3, 1, 3),
(51, 12, 'CS-3124', 3, 1, 1),
(52, 12, 'CS-3124', 3, 1, 2),
(53, 11, 'CS-3124', 3, 1, 1),
(54, 11, 'CS-3124', 3, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(10) NOT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otpExpiry` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `email`, `name`, `password`, `otp`, `otpExpiry`, `created_at`, `updated_at`) VALUES
(4, 'teacheldawlailaiaye22@gmail.com', 'Daw Lai Lai Aye', '$2b$10$XR6cHGSdt.bUMJ//VVdXNOy4kN4ii2.ofpxsLwdFG.EwCHIyLRhzS', NULL, NULL, '2024-08-30 02:43:39', '2024-08-30 02:43:39'),
(5, 'teacheruzawwinmyint@gmail.com', 'U Zaw Win Myint', '$2b$10$iGdqV5GgwCbknk65gsWfi.RMZsD5HuSOthyeOFP4g2OVMK5OdfIki', NULL, NULL, '2024-08-30 02:46:13', '2024-08-30 02:46:13'),
(6, 'teacheldawthetsuhlaing209@gmail.com', 'Daw Thet Su Hlaing', '$2b$10$k2ZGhLjg3Rd0Zf14aSLPTeT31mec4kDyXcJ0qfQbD4YcRO6CO6zvy', NULL, NULL, '2024-08-30 04:25:24', '2024-08-30 04:25:24'),
(7, 'teacheldawnunuhlaing12@gmail.com', 'Daw Nu Nu Hlaing', '$2b$10$U9E2onQwGJ0r6ayIX0wASOU2in/wOih5MDOTxH8Sl5yVM0.9n1Z7e', NULL, NULL, '2024-08-30 04:30:02', '2024-08-30 04:30:02'),
(8, 'teacheldawayeayeko@gmail.com', 'Daw Aye Aye Ko', '$2b$10$Ok9KLy36hKZ50q1b8sfBWuMwje8eT.J7vTrV7R1tIos4LHkypXnEm', NULL, NULL, '2024-08-30 04:32:49', '2024-08-30 04:32:49'),
(9, 'theinkyawe2019@gmail.com', 'Daw Thein Kyawe', '$2b$10$FP9dmFKlbgUBPlDh2xVaVuNfyOTbf5nrnSTzg.YiRhMwtP.MCxZha', NULL, NULL, '2024-08-30 04:44:05', '2024-08-30 04:44:05'),
(10, 'kminkyu84@gmail.com', 'Daw Khin Min Kyu', '$2b$10$l5zSrPK2buwF5VexGo3LXugDort5aK7NaKTSDyvFb.yJhTMH5J0ei', NULL, NULL, '2024-08-30 05:07:45', '2024-09-03 14:07:46'),
(11, 'teacheldawhninmonyi23@gmail.com', 'Daw Hnin Mon Yi', '$2b$10$fHs2PQ4G/E9zQB6jdf2./ugOYzhmG7OicNhpcMkL4N9/98mljf.0a', NULL, NULL, '2024-08-30 05:13:40', '2024-08-30 05:13:40'),
(12, 'teacheldawmyothandarwin@gmail.com', 'Daw Myo Thandar Win', '$2b$10$CGgKXBe.Si899Tp5EoVmCeSk6DXoTUekESuUKSNZf4pzZFoZJtnnS', NULL, NULL, '2024-08-30 05:16:14', '2024-08-30 05:16:14'),
(13, 'teacheldawhninyuhlaing@gmail.com', 'Daw Hnin Yu Hlaing', '$2b$10$tQ9GoNMXK91hmCawSc90huhVB.XowrOGAfhFG5CU1dnBelV.El7qa', NULL, NULL, '2024-08-30 05:18:17', '2024-08-30 05:18:17'),
(14, 'teacheldawpoeeiphyu@gmail.com', 'Daw Poe Ei Phyu', '$2b$10$4XS4IsisBqVnbvu3H3Za6elqgXfpFAiiKZaHm2midWoDtCH3BfxEK', NULL, NULL, '2024-08-30 05:20:38', '2024-08-30 05:20:38'),
(15, 'teacheldawhlahlamyint@gmail.com', 'Daw Hla Hla Myint', '$2b$10$7oY0/rC1zPQCziLQjsbioOO8NBk8v5wQk2MkUh3WmB4uCia/SjOHq', NULL, NULL, '2024-08-30 05:22:10', '2024-08-30 05:22:10'),
(16, 'teacheldaweishwezinnaing23@gmail.com', 'Daw Ei Shwe Zin Naing', '$2b$10$ILzlsaoGtXEb2E4w4P9Z/.kQq9h09/jEUKSRv6zwM.iVOoZkUTYYu', NULL, NULL, '2024-08-30 05:24:11', '2024-08-30 05:24:11'),
(17, 'minko@gmail.com', 'min Ko', '$2b$10$4oXck.uGcRFaGx0g2PJp2eXTsBSHq3GPbwhKhuLaT2jvU5C7LA2hu', NULL, NULL, '2024-08-30 07:53:45', '2024-08-30 07:53:45'),
(18, 'teacheldaweitheintthu@gmail.com', 'Daw Ei Theint Theint Thu', '$2b$10$Kjh0YJkE0NGIi8N1gKWdVusNs0lOrLNqPD3VvOGtB8VBVFqYh1LJG', NULL, NULL, '2024-09-04 01:37:25', '2024-09-04 01:37:25'),
(19, 'teacheldawzinmaryin23@gmail.com', 'Daw Zin Mar Yin', '$2b$10$AYYwI4e7XgPbm3E6nUjWeeSsVAIQhT8y1GIvdmH2.51z7/9ziGXvm', NULL, NULL, '2024-09-04 03:56:08', '2024-09-04 04:35:01'),
(20, 'fjds@gmail.com', 'Teachel zun', '$2b$10$Zlb8ERHCGqG9vBeeeaHXxOmc6dxtAQArNBHTZeWT1EHod13vIhxVe', NULL, NULL, '2024-09-06 07:02:26', '2024-09-06 07:02:26');

-- --------------------------------------------------------

--
-- Table structure for table `titles`
--

CREATE TABLE `titles` (
  `title_id` int(10) NOT NULL,
  `title_name` varchar(225) NOT NULL,
  `teacher_id` int(10) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `grade_id` int(10) NOT NULL,
  `course_code` varchar(200) NOT NULL,
  `semester_id` int(10) NOT NULL,
  `section_id` int(10) NOT NULL,
  `random_order` tinyint(1) NOT NULL DEFAULT 0,
  `answer_time` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `titles`
--

INSERT INTO `titles` (`title_id`, `title_name`, `teacher_id`, `start_time`, `end_time`, `grade_id`, `course_code`, `semester_id`, `section_id`, `random_order`, `answer_time`, `is_active`) VALUES
(1, 'third year', 2, '2024-08-30 12:48:00', '2024-08-31 20:48:00', 3, 'CST-3113', 1, 1, 1, 3600, 1),
(2, 'office1', 2, '2024-08-29 23:16:00', '2024-08-29 23:31:00', 3, 'CST-3113', 1, 1, 1, 3600, 1),
(3, 'quizz1', 2, '2024-08-30 21:31:00', '2024-08-31 21:31:00', 3, 'CST-3113', 1, 1, 1, 3600, 1),
(4, 'php quizz', 2, '2024-08-30 21:49:00', '2024-08-31 12:49:00', 3, 'CST-3113', 1, 1, 1, 3600, 1),
(47, 'timetest', 10, '2024-09-04 23:15:00', '2024-09-05 23:15:00', 3, 'CS-3125', 1, 2, 1, 0, 1),
(51, 'hanzo', 10, '2024-09-04 23:32:00', '2024-09-05 23:32:00', 3, 'CS-3125', 1, 2, 1, 0, 1),
(55, 'office13', 10, '2024-09-04 07:01:00', '2024-09-05 07:01:00', 3, 'CS-3125', 1, 2, 1, 0, 1),
(56, 'forthirdyearsemester1,sectionB', 6, '2024-09-04 09:45:00', '2024-09-05 10:46:00', 3, 'CS-3124', 1, 2, 1, 600, 1),
(57, 'fromdaweitheintthu third year,semester 1,sectionB', 18, '2024-09-05 08:10:00', '2024-09-06 08:10:00', 3, 'CS-3124', 1, 2, 1, 300, 1),
(58, 'forthirdyearsemester1,sectionBzin', 19, '2024-09-04 11:59:00', '2024-09-06 10:59:00', 3, 'CS-3125', 1, 2, 0, 300, 1),
(59, 'mathematics quiz1', 4, '2024-09-06 08:18:00', '2024-09-10 22:20:00', 3, 'CST-3142', 1, 2, 1, 1800, 1),
(61, 'computer architecture', 7, '2024-09-06 10:47:00', '2024-09-10 22:56:00', 3, 'CST-3131', 1, 2, 1, 3600, 1),
(62, 'artificial quiz1', 5, '2024-09-06 11:05:00', '2024-09-10 23:05:00', 3, 'CST-3113', 1, 2, 1, 3600, 1),
(63, 'software analysis question', 6, '2024-09-06 10:15:00', '2024-09-11 23:15:00', 3, 'CS-3124', 1, 2, 1, 300, 1),
(64, 'database for semester2 sectionB', 10, '2024-09-06 08:33:00', '2024-09-13 23:33:00', 3, 'CS-3125', 1, 2, 1, 315, 1),
(65, 'english2', 11, '2024-09-06 21:43:00', '2024-09-09 23:43:00', 2, 'E-2201', 2, 2, 1, 900, 1),
(66, 'databasechoice', 10, '2024-09-06 09:54:00', '2024-09-12 23:54:00', 3, 'CS-3125', 1, 1, 1, 900, 1),
(67, 'forthird year sectionB', 10, '2024-09-13 11:33:00', '2024-09-13 11:34:00', 3, 'CS-3125', 1, 2, 1, 240, 1),
(68, 'for', 10, '2024-09-06 14:40:00', '2024-09-12 13:40:00', 3, 'CS-3125', 1, 2, 1, 720, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `choices`
--
ALTER TABLE `choices`
  ADD PRIMARY KEY (`choice_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_code`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`grade_id`),
  ADD UNIQUE KEY `grade_name` (`grade_name`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `title_id` (`title_id`);

--
-- Indexes for table `quiz_results`
--
ALTER TABLE `quiz_results`
  ADD PRIMARY KEY (`result_id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`title_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`section_id`),
  ADD UNIQUE KEY `section_name` (`section_name`);

--
-- Indexes for table `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`semester_id`),
  ADD UNIQUE KEY `semester_name` (`semester_name`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `roll_number` (`roll_number`);

--
-- Indexes for table `student_answers`
--
ALTER TABLE `student_answers`
  ADD PRIMARY KEY (`answer_id`);

--
-- Indexes for table `taught`
--
ALTER TABLE `taught`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `titles`
--
ALTER TABLE `titles`
  ADD PRIMARY KEY (`title_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `choices`
--
ALTER TABLE `choices`
  MODIFY `choice_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `fid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `grade_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `quiz_results`
--
ALTER TABLE `quiz_results`
  MODIFY `result_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `section_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `semester`
--
ALTER TABLE `semester`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `student_answers`
--
ALTER TABLE `student_answers`
  MODIFY `answer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `taught`
--
ALTER TABLE `taught`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `titles`
--
ALTER TABLE `titles`
  MODIFY `title_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
