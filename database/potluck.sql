# ************************************************************
# Potluck Database
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table assets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assets`;

CREATE TABLE `assets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `caption` varchar(1000) DEFAULT NULL,
  `copyright` varchar(512) DEFAULT NULL,
  `location` varchar(1000) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(4000) DEFAULT NULL,
  `text_content` mediumtext,
  `type_id` int(11) unsigned NOT NULL,
  `submission_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assets_types_fk` (`type_id`),
  KEY `assets_submissions_fk` (`submission_id`),
  CONSTRAINT `assets_submissions_fk` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assets_types_fk` FOREIGN KEY (`type_id`) REFERENCES `assets_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table assets_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assets_types`;

CREATE TABLE `assets_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `assets_types` WRITE;
/*!40000 ALTER TABLE `assets_types` DISABLE KEYS */;

INSERT INTO `assets_types` (`id`, `name`)
VALUES
	(1,'image'),
	(2,'audio'),
	(3,'video'),
	(4,'text');

/*!40000 ALTER TABLE `assets_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table submissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `submissions`;

CREATE TABLE `submissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(1000) NOT NULL DEFAULT '',
  `contact_email` varchar(255) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `theme_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `submissions_themes_fk` (`theme_id`),
  CONSTRAINT `submissions_themes_fk` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) NOT NULL DEFAULT '',
  `vocabulary_id` int(11) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `tags_vocabularies_fk` (`vocabulary_id`),
  CONSTRAINT `tags_vocabularies_fk` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabularies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table themes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `themes`;

CREATE TABLE `themes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(512) NOT NULL DEFAULT '',
  `description` varchar(4000) DEFAULT NULL,
  `date_from` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_to` timestamp NULL DEFAULT NULL,
  `bkg_img_url` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;

INSERT INTO `themes` (`id`, `title`, `description`, `date_from`, `date_to`, `bkg_img_url`)
VALUES
	(1,'Power','Each year, the Prix Pictet is awarded to a professional photographer who has best captured a particular theme in sustainability. Past themes have been \"water,\" \"earth\" and \"growth.\" This year, the theme is \"power.\" What does that mean to you? Is it the power of nature over man? The power of politics? The power it takes to generate electricity? Share, in one photos, what \"Power\" means to you. ','2012-12-01 01:01:01','2015-01-01 00:00:00',NULL),
	(2,'Burning House','?The things you own end up owning you. It\'s only after you lose everything that you\'re free to do anything.? ? Chuck Palahniuk, Fight Club\n\nPeople say things are just things. But what are the things you couldn\'t live without? Say your house is on fire. What do you grab before you run to safety? Show us.','2012-01-01 00:00:00','2015-01-01 00:00:00',NULL),
	(3,'Superstorm Sandy','How is Hurricane Sandy affecting you? Have you seen something that others need to see? Share your experience here and watch the story unfold.','2012-11-05 00:00:00','2012-11-18 00:00:00',NULL),
	(4,'Vintage Halloween','Halloween costumes have gotten pretty advanced. But have you ever looked back at old photos of those early costumes? We want to see the ones in your family\'s photo albums. Share them with us, along with a story.\n','2012-10-01 00:00:00','2012-10-30 00:00:00',NULL);

/*!40000 ALTER TABLE `themes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table vocabularies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vocabularies`;

CREATE TABLE `vocabularies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `vocabularies` WRITE;
/*!40000 ALTER TABLE `vocabularies` DISABLE KEYS */;

INSERT INTO `vocabularies` (`id`, `name`)
VALUES
	(1,'usertags');

/*!40000 ALTER TABLE `vocabularies` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
