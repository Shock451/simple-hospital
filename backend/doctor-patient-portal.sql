-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2021 at 06:55 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `description` text NOT NULL,
  `status` enum('approved','pending','rejected') NOT NULL DEFAULT 'pending',
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `patient_readings`
--

CREATE TABLE `patient_readings` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `blood_sugar` int(11) DEFAULT NULL,
  `blood_pressure` int(11) DEFAULT NULL,
  `heart_rate` int(11) DEFAULT NULL,
  `temperature` int(11) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('doctor','patient') NOT NULL,
  `last_login_time` timestamp NULL DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `after_user_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    IF NEW.role='patient' THEN
        INSERT INTO patients(user_id) VALUES(new.id);
    ELSEIF NEW.role='doctor' THEN
        INSERT INTO doctors(user_id) VALUES(new.id);
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
ALTER TABLE `appointments` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_readings`
--
ALTER TABLE `patient_readings` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users` ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat` MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors` MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients` MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `patient_readings`
--
ALTER TABLE `patient_readings` MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users` MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `mobile`, `email`, `password`, `role`, `last_login_time`, `created`, `updated`) VALUES
('Boluwarin Oladipo', '0709334789', 'oladipo5@gmail.com', '$2y$10$VEhimEu.o1cv5lmboOajKuxo6ntn7AbGo0rEkgLdSas3u.uhCmZhq', 'patient', '2020-08-17 17:06:56', '2020-08-10 10:43:27', '2020-08-17 17:06:56');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
