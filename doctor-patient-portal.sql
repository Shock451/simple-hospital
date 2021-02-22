-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 22, 2021 at 05:24 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctor-patient-portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` text NOT NULL,
  `status` enum('approved','pending','rejected') NOT NULL DEFAULT 'pending',
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `doctor_id`, `date`, `description`, `status`, `created`) VALUES
(2, 6, 5, '2021-02-14 17:31:59', ' Ulcer', 'approved', '2021-02-14 17:31:32');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `from_id`, `to_id`, `message`, `created`) VALUES
(1, 1, 2, 'hello\n', '2021-02-10 17:03:12'),
(2, 2, 1, 'hi', '2021-02-10 17:03:28'),
(3, 3, 4, 'Hello', '2021-02-14 18:10:09'),
(4, 3, 4, 'Hi', '2021-02-14 18:11:20'),
(5, 5, 6, 'Hi', '2021-02-14 18:15:18'),
(6, 6, 5, 'Hello\n', '2021-02-14 18:15:38'),
(7, 2, 1, 'hi', '2021-02-18 13:53:05');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `state` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `license_num` varchar(20) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `user_id`, `address`, `city`, `state`, `description`, `license_num`, `gender`, `updated`) VALUES
(1, 1, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(2, 3, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(3, 5, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(4, 8, 'yadayaydyadya', 'Ejigbo', 'Lago', 'ljkdknsdknskdnsdffff', '892379483y823821', 'male', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `medsrefill`
--

CREATE TABLE `medsrefill` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `status` enum('approved','pending','rejected','') NOT NULL DEFAULT 'pending',
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medsrefill`
--

INSERT INTO `medsrefill` (`id`, `patient_id`, `doctor_id`, `description`, `status`, `date`, `created_at`) VALUES
(1, 2, 1, ' yo', 'pending', '2021-02-10 17:05:00', '2021-02-10 17:05:15'),
(2, 6, 5, ' Paracetamol\nCataflagm', 'approved', '2021-02-14 18:21:00', '2021-02-14 18:21:22');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `dob` timestamp NULL DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `allergies` varchar(1000) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `user_id`, `dob`, `gender`, `allergies`, `address`, `city`, `state`, `description`, `created`, `updated`) VALUES
(1, 2, NULL, 'male', '', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-02-10 16:49:36'),
(2, 4, NULL, 'male', '', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-02-14 18:08:11'),
(3, 6, NULL, 'male', '', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-02-14 18:13:32'),
(4, 7, '2021-01-27 00:00:00', 'male', 'Oluwa is involved', 'Bolu\'s residence', 'City Idk', 'Idk either', 'ssscs', '0000-00-00 00:00:00', '2021-02-22 00:58:40');

-- --------------------------------------------------------

--
-- Table structure for table `patient_readings`
--

CREATE TABLE `patient_readings` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `blood_sugar` float DEFAULT NULL,
  `blood_pressure` float DEFAULT NULL,
  `heart_rate` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `prescribed` int(5) DEFAULT NULL,
  `prescription` varchar(1000) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_readings`
--

INSERT INTO `patient_readings` (`id`, `patient_id`, `blood_sugar`, `blood_pressure`, `heart_rate`, `temperature`, `height`, `weight`, `prescribed`, `prescription`, `created`, `updated`) VALUES
(5, 7, 56, 56, 56, 56, 56, 56, 563, '56 no', '2021-02-22 02:42:08', '2021-02-22 03:17:08');

-- --------------------------------------------------------

--
-- Table structure for table `radiologists`
--

CREATE TABLE `radiologists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `state` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `license_num` varchar(20) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `updated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `radiologists`
--

INSERT INTO `radiologists` (`id`, `user_id`, `address`, `city`, `state`, `description`, `license_num`, `gender`, `updated`) VALUES
(1, 1, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(2, 3, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(3, 5, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(4, 8, 'yadayaydyadya', 'Ejigbo', 'Lago', 'ljkdknsdknskdnsdffff', '892379483y823821', 'male', '0000-00-00 00:00:00'),
(5, 13, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-22 04:14:54');

-- --------------------------------------------------------

--
-- Table structure for table `radiology_scans`
--

CREATE TABLE `radiology_scans` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `image_uri` varchar(256) NOT NULL,
  `report` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('doctor','patient','radiologist') NOT NULL,
  `last_login_time` timestamp NULL DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `email`, `password`, `role`, `last_login_time`, `created`, `updated`) VALUES
(1, 'Bolu Esq', '09096781234', 'patient2@test.com', '$2a$10$MyUc5UTge13JA5MzhodlvOpO.hwh7/50e4nLOZNZ9rz17cS.2aSCy', 'doctor', NULL, '2021-02-10 15:49:08', NULL),
(2, 'Bolu Esq', '09092341234', 'patient@test.com', '$2a$10$0GHiMcCnLZxzWaXrylhyAehGnEcmCBuFW1PH0CGYJbKhC3k032Qoi', 'patient', NULL, '2021-02-10 15:49:36', NULL),
(3, 'Yeni', '09875756542', 'doctor@test.com', '$2a$10$K17bOgS68RV6oDVaXivvo.iyd1FlAEzlr45vTmz4TTyN0Tq9rpDJ.', 'doctor', NULL, '2021-02-14 17:07:11', NULL),
(4, 'Yeni As Well', '09876543212', 'patient3@test.com', '$2a$10$RJXtOCWZm8BnQZYs8DwuVuCNpJ7ncsrizKmX5RVoBn0x8dnlUAw2y', 'patient', NULL, '2021-02-14 17:08:11', NULL),
(5, 'Joel', '04939840878', 'joel@test.com', '$2a$10$Gq2HDQwX/3hGNMj/s14SLe0oWtQimpP4FauvFdwpXmMGxpAP8iCtS', 'doctor', NULL, '2021-02-14 17:13:05', NULL),
(6, 'Yeni', '04939840878', 'yeni@test.com', '$2a$10$f2b5e8U5HTf.LnYmg9OJmeNV2ww8RQfszLG9LuiPAEvSooL0fq6.q', 'patient', NULL, '2021-02-14 17:13:32', NULL),
(7, 'Abdulskosko', '09061279159', 'ayobami.oladosu@aol.com', '$2a$10$3ByMu1dQ01FjmEo50K2u4.yzgYQqFohn.O1Yevo1hqXj/xXk2AxYO', 'patient', NULL, '2021-02-21 23:41:16', NULL),
(8, 'OladosuA', '09061279157', 'oladosua@gmail.com', '$2a$10$hRwWFP0ld7dCiMawIm5R8ulpu9SsMMFmPNxOhAAlpoX9U03eJMSCW', 'doctor', NULL, '2021-02-21 23:57:58', NULL),
(9, 'Doyin', '09061279150', 'doyin@gmail.com', '$2a$10$6vIVc.xDSGcn5UrkXZ8o6.FtPsYXOLmFi8kjIKXBxVB6TnasuBshe', 'radiologist', NULL, '2021-02-22 03:54:16', NULL),
(10, 'sss', '09061279155', 'sss@gmail.com', '$2a$10$/uiWQxIof32OEbI634F7DeEwx36U3oQFPIbXC8c1r7gpA1LOyoQJS', 'radiologist', NULL, '2021-02-22 04:05:01', NULL),
(13, 'hhh', '09061279150', 'hhh@gmail.com', '$2a$10$YNR40iueELbf3Y0rvetZtOLDWiE1keduAuVC3N4ygG1PZPtGE94Gy', 'radiologist', NULL, '2021-02-22 04:14:54', NULL);

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `after_user_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    IF NEW.role='patient' THEN
        INSERT INTO patients(user_id) VALUES(new.id);
    ELSEIF NEW.role='doctor' THEN
        INSERT INTO doctors(user_id) VALUES(new.id);
    ELSEIF NEW.role='radiologist' THEN
        INSERT INTO radiologists(user_id) VALUES(new.id);
    END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medsrefill`
--
ALTER TABLE `medsrefill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_readings`
--
ALTER TABLE `patient_readings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `radiologists`
--
ALTER TABLE `radiologists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `radiology_scans`
--
ALTER TABLE `radiology_scans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `medsrefill`
--
ALTER TABLE `medsrefill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient_readings`
--
ALTER TABLE `patient_readings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `radiologists`
--
ALTER TABLE `radiologists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `radiology_scans`
--
ALTER TABLE `radiology_scans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
