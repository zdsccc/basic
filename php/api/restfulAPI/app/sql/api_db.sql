/*
Navicat MySQL Data Transfer

Source Server         : 5.7.14
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : api_db

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-05-18 10:56:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `description` text CHARACTER SET utf8 NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', 'Fashion', 'Category for anything related to fashion.', '2014-06-01 00:35:07', '2014-05-30 17:34:33');
INSERT INTO `categories` VALUES ('2', 'Electronics', 'Gadgets, drones and more.', '2014-06-01 00:35:07', '2014-05-30 17:34:33');
INSERT INTO `categories` VALUES ('3', 'Motors', 'Motor sports and more', '2014-06-01 00:35:07', '2014-05-30 17:34:54');
INSERT INTO `categories` VALUES ('5', 'Movies', 'Movie products.', '2014-06-01 00:35:07', '2016-01-08 13:27:26');
INSERT INTO `categories` VALUES ('6', 'Books', 'Kindle books, audio books and more.', '2014-06-01 00:35:07', '2016-01-08 13:27:47');
INSERT INTO `categories` VALUES ('13', 'Sports', 'Drop into new winter gear.', '2016-01-09 02:24:24', '2016-01-09 01:24:24');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(32) CHARACTER SET latin1 NOT NULL,
  `description` text CHARACTER SET latin1 NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', 'LG P880 4X HD', 'My first awesome phone!', '336', '3', '2014-06-01 01:12:26', '2014-05-31 17:12:26');
INSERT INTO `products` VALUES ('2', 'Google Nexus 4', 'The most awesome phone of 2013!', '299', '2', '2014-06-01 01:12:26', '2014-05-31 17:12:26');
INSERT INTO `products` VALUES ('3', 'Samsung Galaxy S4', 'How about no?', '600', '3', '2014-06-01 01:12:26', '2014-05-31 17:12:26');
INSERT INTO `products` VALUES ('6', 'Bench Shirt', 'The best shirt!', '29', '1', '2014-06-01 01:12:26', '2014-05-31 02:12:21');
INSERT INTO `products` VALUES ('7', 'Lenovo Laptop', 'My business partner.', '399', '2', '2014-06-01 01:13:45', '2014-05-31 02:13:39');
INSERT INTO `products` VALUES ('8', 'Samsung Galaxy Tab 10.1', 'Good tablet.', '259', '2', '2014-06-01 01:14:13', '2014-05-31 02:14:08');
INSERT INTO `products` VALUES ('9', 'Spalding Watch', 'My sports watch.', '199', '1', '2014-06-01 01:18:36', '2014-05-31 02:18:31');
INSERT INTO `products` VALUES ('10', 'Sony Smart Watch', 'The coolest smart watch!', '300', '2', '2014-06-06 17:10:01', '2014-06-05 18:09:51');
INSERT INTO `products` VALUES ('11', 'Huawei Y300', 'For testing purposes.', '100', '2', '2014-06-06 17:11:04', '2014-06-05 18:10:54');
INSERT INTO `products` VALUES ('12', 'Abercrombie Lake Arnold Shirt', 'Perfect as gift!', '60', '1', '2014-06-06 17:12:21', '2014-06-05 18:12:11');
INSERT INTO `products` VALUES ('13', 'Abercrombie Allen Brook Shirt', 'Cool red shirt!', '70', '1', '2014-06-06 17:12:59', '2014-06-05 18:12:49');
INSERT INTO `products` VALUES ('26', 'Another product', 'Awesome product!', '555', '2', '2014-11-22 19:07:34', '2014-11-21 20:07:34');
INSERT INTO `products` VALUES ('28', 'Wallet', 'You can absolutely use this one!', '799', '6', '2014-12-04 21:12:03', '2014-12-03 22:12:03');
INSERT INTO `products` VALUES ('31', 'Amanda Waller Shirt', 'New awesome shirt!', '333', '1', '2014-12-13 00:52:54', '2014-12-12 01:52:54');
INSERT INTO `products` VALUES ('42', 'Nike Shoes for Men', 'Nike Shoes', '12999', '3', '2015-12-12 06:47:08', '2015-12-12 05:47:08');
INSERT INTO `products` VALUES ('48', 'Bristol Shoes', 'Awesome shoes.', '999', '5', '2016-01-08 06:36:37', '2016-01-08 05:36:37');
INSERT INTO `products` VALUES ('60', 'Rolex Watch', 'Luxury watch.', '25000', '1', '2016-01-11 15:46:02', '2016-01-11 14:46:02');
