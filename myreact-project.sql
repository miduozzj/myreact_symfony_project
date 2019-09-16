/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : myreact-project

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-09-16 17:45:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for migration_versions
-- ----------------------------
DROP TABLE IF EXISTS `migration_versions`;
CREATE TABLE `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of migration_versions
-- ----------------------------
INSERT INTO `migration_versions` VALUES ('20190319101020', '2019-03-19 10:12:15');
INSERT INTO `migration_versions` VALUES ('20190327121410', '2019-03-27 12:14:29');
INSERT INTO `migration_versions` VALUES ('20190327125714', '2019-03-27 12:57:36');
INSERT INTO `migration_versions` VALUES ('20190327125940', '2019-03-27 12:59:53');

-- ----------------------------
-- Table structure for mytable
-- ----------------------------
DROP TABLE IF EXISTS `mytable`;
CREATE TABLE `mytable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `des` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of mytable
-- ----------------------------
INSERT INTO `mytable` VALUES ('24', '太阳 y', '他', '士');
INSERT INTO `mytable` VALUES ('25', 'jkl', 'kjljk', 'jkljyy');
INSERT INTO `mytable` VALUES ('26', 'jklj', 'kjljk', 'ljkl');
INSERT INTO `mytable` VALUES ('27', 'jklkj', 'ljk', 'ljkl');
INSERT INTO `mytable` VALUES ('28', 'kjl', 'kjl', 'jljl');
INSERT INTO `mytable` VALUES ('29', 'dd', 'dd', 'dd');
INSERT INTO `mytable` VALUES ('30', 'ddd', 'dd', 'ddd');
INSERT INTO `mytable` VALUES ('31', 'ujujuju', 'juj', 'ju');
INSERT INTO `mytable` VALUES ('32', 'jkj', 'kjk', 'kjkjk');
INSERT INTO `mytable` VALUES ('33', '】【】', '】【】', '【】');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zzj', '[\'\'ROLE_USER\"]', '123');
