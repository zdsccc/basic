-- phpMyAdmin SQL Dump
-- version 2.9.1.1
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Jul 09, 2007 at 12:55 AM
-- Server version: 5.0.41
-- PHP Version: 4.4.6
-- 
-- Database: `test`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `sql_injection_test`
-- 

DROP TABLE IF EXISTS `sql_injection_test`;
CREATE TABLE `sql_injection_test` (
  `userid` int(11) NOT NULL auto_increment,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY  (`userid`),
  KEY `username` (`username`(3))
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

-- 
-- Dumping data for table `sql_injection_test`
-- 

INSERT INTO `sql_injection_test` (`userid`, `username`, `password`) VALUES 
(1, 'Winnie', 'Pooh'),
(2, 'Edward', 'Sanders'),
(3, 'Christopher', 'Robin');
