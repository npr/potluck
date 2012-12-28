# ************************************************************
# Potluck Project Data Model
# ------------------------------------------------------------

# Table assets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assets`;

CREATE TABLE `assets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `caption` varchar(1000) DEFAULT NULL,
  `copyright` varchar(512) DEFAULT NULL,
  `location` varchar(1000) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
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



# Table assets_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assets_types`;

CREATE TABLE `assets_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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


# table submissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `submissions`;

CREATE TABLE `submissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(1000) NOT NULL DEFAULT '',
  `contact_email` varchar(255) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `theme_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `submissions_themes_fk` (`theme_id`),
  CONSTRAINT `submissions_themes_fk` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Table themes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `themes`;

CREATE TABLE `themes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(512) NOT NULL DEFAULT '',
  `description` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
