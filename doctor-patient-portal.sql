-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 10, 2021 at 08:04 AM
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
  `gender` enum('male','female') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `user_id`, `address`, `city`, `state`, `description`, `license_num`, `gender`) VALUES
(1, 1, NULL, NULL, NULL, NULL, '0', 'male'),
(5, 22, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `user_id`, `dob`, `gender`, `allergies`, `address`, `city`, `state`, `description`, `created`, `updated`) VALUES
(1, 2, NULL, 'male', '', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-02-10 16:49:36'),
(2, 4, NULL, 'male', '', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-02-14 18:08:11'),
(3, 6, NULL, 'male', '', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-02-14 18:13:32'),
(4, 7, '2021-01-27 00:00:00', 'male', 'Oluwa is involved', 'Bolu\'s residence', 'City Idk', 'Idk either', 'ssscs', '0000-00-00 00:00:00', '2021-02-22 00:58:40'),
(5, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-03-06 17:57:14', '2021-03-06 17:57:14'),
(6, 19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-03-06 17:57:53', '2021-03-06 17:57:53'),
(7, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-04-06 21:49:48', '2021-04-06 21:49:48'),
(8, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-04-10 03:49:31', '2021-04-10 03:49:31');

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
(5, 7, 56, 56, 56, 56, 56, 56, 563, '56 no', '2021-02-22 02:42:08', '2021-02-22 03:17:08'),
(6, 24, 45000, 46, 48, 37, 1.86, 72, 6, ' dollar high', '2021-04-06 21:58:37', '2021-04-06 22:17:15');

-- --------------------------------------------------------

--
-- Table structure for table `radiographers`
--

CREATE TABLE `radiographers` (
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
-- Dumping data for table `radiographers`
--

INSERT INTO `radiographers` (`id`, `user_id`, `address`, `city`, `state`, `description`, `license_num`, `gender`, `updated`) VALUES
(1, 1, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(2, 3, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(3, 5, NULL, NULL, NULL, NULL, '0', 'male', '0000-00-00 00:00:00'),
(4, 8, 'yadayaydyadya', 'Ejigbo', 'Lago', 'ljkdknsdknskdnsdffff', '892379483y823821', 'male', '0000-00-00 00:00:00'),
(8, 28, NULL, NULL, NULL, NULL, NULL, NULL, '2021-04-10 04:01:07');

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

--
-- Dumping data for table `radiology_scans`
--

INSERT INTO `radiology_scans` (`id`, `patient_id`, `image_uri`, `report`) VALUES
(1, 2, '47fd0df2-693a-4437-94bb-aa901895e6e4.png', ' How far'),
(2, 19, 'eb46ecb5-1af5-4829-b5be-710d26158e57.png', ' Bolu monkeeyyyyy'),
(3, 2, '681a9b92-af86-4d54-8442-5d50bc3e71bf.png', ' Animal. Fish. Rat'),
(4, 24, 'f61bc65c-6f81-41de-a5a1-1037be0b00f9.png', 'Fucktard ');

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
  `role` enum('doctor','patient','radiographer','admin') NOT NULL,
  `last_login_time` timestamp NULL DEFAULT NULL,
  `created` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `email`, `password`, `role`, `last_login_time`, `created`) VALUES
(1, 'Bolu Esq', '09096781234', 'patient2@test.com', '$2a$10$MyUc5UTge13JA5MzhodlvOpO.hwh7/50e4nLOZNZ9rz17cS.2aSCy', 'doctor', NULL, '2021-02-10 15:49:08'),
(2, 'Bolu Esq', '09092341234', 'patient@test.com', '$2a$10$0GHiMcCnLZxzWaXrylhyAehGnEcmCBuFW1PH0CGYJbKhC3k032Qoi', 'patient', NULL, '2021-02-10 15:49:36'),
(4, 'Yeni As Well', '09876543212', 'patient3@test.com', '$2a$10$RJXtOCWZm8BnQZYs8DwuVuCNpJ7ncsrizKmX5RVoBn0x8dnlUAw2y', 'patient', NULL, '2021-02-14 17:08:11'),
(6, 'Yeni', '04939840878', 'yeni@test.com', '$2a$10$f2b5e8U5HTf.LnYmg9OJmeNV2ww8RQfszLG9LuiPAEvSooL0fq6.q', 'patient', NULL, '2021-02-14 17:13:32'),
(7, 'Abdulskosko', '09061279159', 'ayobami.oladosu@aol.com', '$2a$10$3ByMu1dQ01FjmEo50K2u4.yzgYQqFohn.O1Yevo1hqXj/xXk2AxYO', 'patient', NULL, '2021-02-21 23:41:16'),
(10, 'sss', '09061279155', 'sss@gmail.com', '$2a$10$/uiWQxIof32OEbI634F7DeEwx36U3oQFPIbXC8c1r7gpA1LOyoQJS', 'radiographer', NULL, '2021-02-22 04:05:01'),
(18, 'bolumonkey2', '09061279155', 'bolumonkey2@gmail.com', '$2a$10$hk6SgBZlQUoM4cBKW8GkLuZiggCjhxnpJfNZpiQAqGbIxd4GpRt.u', 'patient', NULL, '2021-03-06 17:57:14'),
(19, 'bolumonkey3', '09061279150', 'bolumonkey3@gmail.com', '$2a$10$/z2Gay0EgSj8Kgk.Bu6du.ssVk2E.TzwskA0o6sZaP6zDLJsWlbs6', 'patient', NULL, '2021-03-06 17:57:53'),
(22, 'bolumonkey5', '09061279150', 'bolumonkey5@gmail.com', '$2a$10$tkn8aqU6arvKJ/OjNW6mPeVq4cXdFqc3f4tn7RNDfV9ROLDPkQz0K', 'doctor', NULL, '2021-03-06 18:41:06'),
(24, 'bolumoney', '09061279150', 'bolumoney@gmail.com', '$2a$10$YRYK1c8mBq6RUT0XflkScuoAj6xgiW4d7SZcAf5X8tHdDitEsaiD.', 'patient', NULL, '2021-04-06 21:49:48'),
(26, 'badboy', '09061279158', 'badboy@dpp.com', 'password', 'admin', NULL, '2021-04-10 02:46:33'),
(27, 'sdshd', '09061279158', 'dumbdumb@sshfs.com', '$2a$10$5ePCiKLitpWqLPZb80rabejlzdl0Gu81chpkABRLSouUFztET/gQK', 'patient', NULL, '2021-04-10 03:49:31');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `after_user_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    IF NEW.role='patient' THEN
        INSERT INTO patients(user_id) VALUES(new.id);
    ELSEIF NEW.role='doctor' THEN
        INSERT INTO doctors(user_id) VALUES(new.id);
    ELSEIF NEW.role='radiographer' THEN
        INSERT INTO radiographers(user_id) VALUES(new.id);
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
-- Indexes for table `radiographers`
--
ALTER TABLE `radiographers`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `medsrefill`
--
ALTER TABLE `medsrefill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `patient_readings`
--
ALTER TABLE `patient_readings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `radiographers`
--
ALTER TABLE `radiographers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `radiology_scans`
--
ALTER TABLE `radiology_scans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
