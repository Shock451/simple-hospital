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
('Cordelia Luna', '0709334789', 'nirikeh@odipafa.dz', '$2y$10$VEhimEu.o1cv5lmboOajKuxo6ntn7AbGo0rEkgLdSas3u.uhCmZhq', 'Patient', '2020-08-17 17:06:56', '2020-08-10 10:43:27', '2020-08-17 17:06:56'),
('Jorge Rodriguez', '08036735365', 'jowpar@zu.jo', '$2y$10$kbJG2oKhGAbcpckFmqm1VudZOQvTQaQfqoj43HjURpz/fPg7FHtDq', 'Doctor', '2020-08-17 06:54:37', '2020-08-10 10:45:27', '2020-08-17 06:54:37'),
('Manuel Casey', '07081378064', 'nihtawid@rorak.li', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Patient', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22'),
('Edwin Rogers', '07055650884', 'kofop@kuw.id', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Doctor', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22'),
('Aaron Fisher', '09029682793', 'ur@zinaete.vi', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Doctor', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22'),
('Millie Fowler', '08050553268', 'garjig@basko.bj', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Doctor', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22'),
('Mason Rice', '07097912384', 'gacuraj@vaepuzoj.st', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Doctor', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22'),
('Roger Love', '08048214826', 'bawiuc@nazikbej.ga', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Doctor', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22'),
('Charlie Bowman', '08034426429', 'aztalcid@ros.sj', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Patient', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22'),
('Sean Lynch', '08035325264', 'ofuric@nusrut.ms', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Patient', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22'),
('Brett Carson', '08071373295', 'mil@wigu.la', '$2y$10$ZCOfnmYhYVvH4SpUlO88ROKZvAzMvMt9k5liKKQ0iWeyoNS3bGR.e', 'Doctor', '2020-08-10 21:02:22', '2020-08-10 20:15:22', '2020-08-10 21:02:22');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
