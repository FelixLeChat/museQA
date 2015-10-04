DROP TABLE IF EXISTS `muse_readings`;
CREATE TABLE `muse_readings` (
  `source` text,
  `ts` bigint(20) DEFAULT NULL,
  `json` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
