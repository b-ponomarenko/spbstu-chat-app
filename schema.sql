-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Oct 23, 2016 at 07:55 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `spbstu-chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `dialogs`
--

CREATE TABLE `dialogs` (
  `id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dialogs`
--

INSERT INTO `dialogs` (`id`, `title`, `avatar`) VALUES
(1, 'Aivee', 'http://dummyimage.com/196x101.png/ff4444/ffffff'),
(2, 'Kwimbee', 'http://dummyimage.com/111x186.jpg/5fa2dd/ffffff'),
(3, 'Brainlounge', 'http://dummyimage.com/139x234.png/ff4444/ffffff'),
(4, 'Zoombeat', 'http://dummyimage.com/165x138.jpg/5fa2dd/ffffff'),
(5, 'Bluezoom', 'http://dummyimage.com/228x169.bmp/5fa2dd/ffffff'),
(6, 'Vidoo', 'http://dummyimage.com/206x162.bmp/dddddd/000000'),
(7, 'Teklist', 'http://dummyimage.com/237x202.jpg/dddddd/000000'),
(8, 'Plajo', 'http://dummyimage.com/219x173.png/cc0000/ffffff'),
(9, 'Realfire', 'http://dummyimage.com/102x240.png/cc0000/ffffff'),
(10, 'Twitterbridge', 'http://dummyimage.com/174x117.png/5fa2dd/ffffff');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `createdDatetime` datetime NOT NULL,
  `dialog` int(11) NOT NULL,
  `message` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user`, `createdDatetime`, `dialog`, `message`) VALUES
(1, 12, '2016-10-22 13:50:54', 10, 'Hello, world!'),
(2, 12, '2016-10-22 13:51:09', 9, 'Hello, world!'),
(3, 13, '2016-10-22 13:51:43', 10, 'Hello, world too!');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `label` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `label`) VALUES
(1, 'ADMIN'),
(2, 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `firstName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `role` int(11) NOT NULL,
  `password` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `firstName`, `lastName`, `role`, `password`) VALUES
(12, 'ponomarenko.bogdan@yandex.ru', 'Богдан', 'Пономаренко', 2, 'c471c2f93425912b5d4381a30c319a81'),
(13, 'gromova@mail.ru', 'Дарья', 'Громова', 2, 'c471c2f93425912b5d4381a30c319a81'),
(15, 'koz@mail.ru', 'Илья', 'Козловский', 2, 'c471c2f93425912b5d4381a30c319a81');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dialogs`
--
ALTER TABLE `dialogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Messages_fk0` (`user`),
  ADD KEY `Messages_fk1` (`dialog`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Roles_label_uindex` (`label`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_uindex` (`email`),
  ADD KEY `users_roles_id_fk` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `Messages_fk0` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `Messages_fk1` FOREIGN KEY (`dialog`) REFERENCES `dialogs` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_roles_id_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);
