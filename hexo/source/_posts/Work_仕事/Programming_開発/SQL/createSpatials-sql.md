---
title: createSpatials.sql
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: false
tocOpen: true
indexing: true
display_tag_onHome: true
recommendedSection: false
donate: false
swiper: false
geolocation: 'Tokyo, Japan'
copyright: true
mathjax: false
share: true
tags:
  - migrated from rBlogger.2009
categories:
  - Work_仕事
  - Programming_開発
  - SQL
date: 2011-08-03 06:57:23
---
```sql
DROP PROCEDURE IF EXISTS `cSpatials_Country`;


## Written by Richie Bartlett (LoreZyra)
## Stored Procedure for MySQL 5.0 
## Purpose: to process imported csv data in GeoIPCountryWhois from MaxMind.com - CountryBlocks;
##          Will automatically create the spatial data to enhance searching performance;
## Version: 1.2
## NOTE: error handling NOT supported in MySQL 5.0, but MySQL 5.5 does support...
DELIMITER //
CREATE DEFINER=`rirodev1`@`localhost` PROCEDURE rblogger0.`cSpatials_Country`(
    #IN tableFrom nVARCHAR(255),
    #IN tableTo nVARCHAR(255),
    OUT outMsg VARCHAR(255)
) COMMENT 'process csv table from GeoIPCountryWhois.csv [creates spatial data]'
BEGIN
  #DECLARE err int;
  DECLARE g polygon;
  DECLARE gt VARCHAR(255);
  DECLARE done INT DEFAULT 0;
  DECLARE IPStart INT;
  DECLARE IPEnd INT;
  DECLARE blnFlag1 TINYINT(1);
  DECLARE blnFlag2 TINYINT(1);
  DECLARE ISO CHAR(2);
  DECLARE strText VARCHAR(255);
  DECLARE cur1 CURSOR FOR SELECT `start`,`end`,`cc`FROM rblogger0.`csv`;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  SET outMsg:='Error: required tables dont exist!';#DEFAULT err msg
  #SET blnFlag1:=table_exist('rblogger0',@tableFrom);#csv
  #SET blnFlag2:=table_exist('rblogger0',@tableTo); #geoCountryIP
  SET blnFlag1:=table_exist('rblogger0','csv');
  SET blnFlag2:=table_exist('rblogger0','geoCountryIP'); 

  #IF blnFlag2=FALSE AND @tableFrom<>@tableTo THEN
  IF blnFlag2=FALSE THEN
	## auto create missing table!
	CREATE  TABLE  `geoCountryIP` (
	 `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	 `ipPoly` POLYGON NOT NULL, SPATIAL INDEX(ipPoly),
	 `IPnumStart` int( 16  )  unsigned NOT  NULL  COMMENT  'calculated IP number',
	 INDEX(`IPnumStart`),
	 `IPnumEnd` int( 16  )  unsigned NOT  NULL  COMMENT  'calculated IP number',
	 `ISO3166` char( 2  )  collate utf8_unicode_ci  default NULL  
	) ENGINE  =  MyISAM  DEFAULT CHARSET  = utf8 COLLATE  = utf8_unicode_ci;
    SET blnFlag2:=1;
    SET outMsg:='Note: created destination Table';
  END IF;#table_exist

  #IF blnFlag1=TRUE AND blnFlag2=TRUE AND @tableFrom<>@tableTo THEN
  IF blnFlag1=TRUE AND blnFlag2=TRUE THEN
    #TRUNCATE TABLE @tableTo; #rblogger0.geoCountryIP2;#empty input table
    TRUNCATE TABLE `rblogger0`.`geoCountryIP`;#empty input table

    OPEN cur1;

    START TRANSACTION;

    read_loop: LOOP
      FETCH cur1 INTO IPStart,IPEnd,ISO;
      IF done THEN LEAVE read_loop; END IF;
      SELECT CONCAT('POLYGON(LINESTRING(POINT(',IPStart,',-1), POINT(',IPEnd,',-1), POINT(',IPEnd,',1), POINT(',IPStart,',1), POINT(',IPStart,',-1)))') INTO gt;
      #SELECT GeomFromText(gt) INTO g;

      IF gt IS NULL THEN LEAVE read_loop; END IF;
      IF gt IS NOT NULL THEN
        SELECT GeomFromWKB(POLYGON(LINESTRING(POINT(IPStart,-1), POINT(IPEnd,-1), POINT(IPEnd,1), POINT(IPStart,1), POINT(IPStart,-1)))) INTO g;
        #INSERT INTO @tableTo values('', g, IPStart, IPEnd, ISO);
        INSERT INTO `geoCountryIP` values('', g, IPStart, IPEnd, ISO);
      END IF;
      #SELECT @err = @@error IF @err <> 0 BEGIN ROLLBACK TRANSACTION RETURN @err END;
      #SELECT @err = coalesce(nullif(@err, 0), @@error)
      #IF @err <> 0 THEN LEAVE read_loop; END IF;
    END LOOP;

    CLOSE cur1;

    COMMIT;# TRANSACTION;
	#SET strText:='Processed import from GeoIPCountryWhois.csv';
	SELECT CONCAT(strText,' ',NOW()) INTO strText;
    #ALTER TABLE @tableTo COMMENT = strText;
    ALTER TABLE `geoCountryIP` COMMENT = 'Processed import from GeoIPCountryWhois.csv';
    DROP TABLE `csv`;
  END IF;#table_exist

  SET outMsg:=gt;
END; # // #PROCEDURE
DELIMITER;

########################################################################

CALL cSpatials_Country(
'csv','geoCountryIP',@returnMsg
);
CALL cSpatials_Country(@returnMsg);
SELECT @returnMsg;

########################################################################
DROP PROCEDURE IF EXISTS `cSpatials_IPblocks`;


## Written by Richie Bartlett (LoreZyra)
## Stored Procedure for MySQL 5.0 
## Purpose: to process imported csv data in GEOipTABLE from MaxMind.com - IPBlocks;
##          Will automatically create the spatial data to enhance searching performance;
## Version: 1.0
## NOTE: error handling NOT supported in MySQL 5.0, but MySQL 5.5 does support...
DELIMITER //
CREATE DEFINER=`rirodev1`@`localhost` PROCEDURE rblogger0.`cSpatials_IPblocks`(
    OUT outMsg VARCHAR(255)
) COMMENT 'process csv table from GeoLiteCity-Blocks.csv [creates spatial data]'
BEGIN
  #DECLARE err int;
  DECLARE g polygon;
  DECLARE gt VARCHAR(255);
  DECLARE done INT DEFAULT 0;
  DECLARE IPStart INT;
  DECLARE IPEnd INT;
  DECLARE blnFlag1 TINYINT(1);
  DECLARE blnFlag2 TINYINT(1);
  DECLARE Loc INT;
  DECLARE strText VARCHAR(255);
  DECLARE cur1 CURSOR FOR SELECT `start`,`end`,`ci` FROM rblogger0.`ip`;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  SET outMsg:='Error: required tables dont exist!';#DEFAULT err msg
  SET blnFlag1:=table_exist('rblogger0','ip');
  SET blnFlag2:=table_exist('rblogger0','geoIPblocks'); 

  IF blnFlag2=FALSE THEN
	## auto create missing table!
	CREATE  TABLE  `geoIPblocks` (
	 `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	 `ipPoly` POLYGON NOT NULL, SPATIAL INDEX(ipPoly),
	 `IPnumStart` int( 16  )  unsigned NOT  NULL  COMMENT  'calculated IP number',
	 `IPnumEnd` int( 16  )  unsigned NOT  NULL  COMMENT  'calculated IP number',
	 INDEX(`IPnumStart`),
	 `locID` bigint( 20 )   default 0  NOT  NULL  COMMENT  'ref to geoCityLoc.id'  
	) ENGINE  =  MyISAM  DEFAULT CHARSET  = utf8 COLLATE  = utf8_unicode_ci;
    SET blnFlag2:=1;
    SET outMsg:='Note: created destination Table';
  END IF;#table_exist

  IF blnFlag1=TRUE AND blnFlag2=TRUE THEN
    TRUNCATE TABLE `rblogger0`.`geoIPblocks`;#empty input table

    OPEN cur1;

    START TRANSACTION;

    read_loop: LOOP
      FETCH cur1 INTO IPStart,IPEnd,Loc;
      IF done THEN LEAVE read_loop; END IF;
      SELECT CONCAT('POLYGON(LINESTRING(POINT(',IPStart,',-1), POINT(',IPEnd,',-1), POINT(',IPEnd,',1), POINT(',IPStart,',1), POINT(',IPStart,',-1)))') INTO gt;
      #SELECT GeomFromText(gt) INTO g;

      IF gt IS NULL THEN LEAVE read_loop; END IF;
      IF gt IS NOT NULL THEN
        SELECT GeomFromWKB(POLYGON(LINESTRING(POINT(IPStart,-1), POINT(IPEnd,-1), POINT(IPEnd,1), POINT(IPStart,1), POINT(IPStart,-1)))) INTO g;
        INSERT INTO `geoIPblocks` values('', g, IPStart, IPEnd, Loc);
      END IF;
      #SELECT @err = @@error IF @err <> 0 BEGIN ROLLBACK TRANSACTION RETURN @err END;
      #SELECT @err = coalesce(nullif(@err, 0), @@error)
      #IF @err <> 0 THEN LEAVE read_loop; END IF;
    END LOOP;

    CLOSE cur1;

    COMMIT;# TRANSACTION;
    ALTER TABLE `geoIPblocks` COMMENT = 'Processed import from GeoLiteCity-Blocks.csv';
    DROP TABLE `ip`;
  END IF;#table_exist

  SET outMsg:=gt;
END; # // #PROCEDURE
DELIMITER;

########################################################################

CALL cSpatials_IPblocks(@returnMsg);
SELECT @returnMsg;

########################################################################

DROP FUNCTION IF EXISTS `table_exist`;

## Written by Richie Bartlett (LoreZyra)
## Stored Function for MySQL 5.0 
## Purpose: to determine if a table exists;
## Version: 1.0
DELIMITER //
CREATE FUNCTION `table_exist`
(
  s_database_name nvarchar(255),
  s_table_name nvarchar(255)
)
RETURNS TINYINT
BEGIN
DECLARE existFlag TINYINT DEFAULT 0;

IF EXISTS (
  SELECT 1 FROM Information_schema.tables 
  WHERE TABLE_TYPE ='BASE TABLE' AND TABLE_NAME = s_table_name AND TABLE_SCHEMA = s_database_name
) THEN SET existFlag:=1;

end if;
RETURN existFlag;
END//
DELIMITER ; 

########################################################################

Set @tableFlag:=table_exist('rblogger0','geoCountryIP');
SELECT @tableFlag;

########################################################################

CREATE TABLE `rblogger0`.`geoCityLoc` (
`id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`ISO3166` VARCHAR( 4 ) NULL ,
`ISO3166_2` VARCHAR( 2 ) NULL ,
`cityName` VARCHAR( 255 ) NULL ,
`PostalCode` VARCHAR( 16 ) NULL ,
`lat` DECIMAL( 11, 7 ) NOT NULL DEFAULT '0',
`lng` DECIMAL( 11, 7 ) NOT NULL DEFAULT '0',
`metroCode` VARCHAR( 16 ) NULL ,
`areaCode` VARCHAR( 16 ) NULL
) ENGINE = MYISAM COMMENT = 'GeoLiteCity-Location.csv' 

########################################################################

DROP PROCEDURE IF EXISTS `prepMaxMindImport`;

## Written by Richie Bartlett (LoreZyra)
## Stored PROCEDURE for MySQL 5.0 
## Purpose: prepare to import CSV data from MaxMind.com;
## Version: 1.0
DELIMITER //
CREATE DEFINER=`rirodev1`@`localhost` PROCEDURE rblogger0.`prepMaxMindImport`(
) COMMENT 'Prepare tables for csv data from MaxMind.com'
BEGIN
	DROP TABLE IF EXISTS `csv`;
	CREATE TABLE `csv` (
	`start_ip` char(15)NOT NULL,
	`end_ip` char(15)NOT NULL,
	`start` int(10) unsigned NOT NULL,
	`end` int(10) unsigned NOT NULL,
	`cc` char(2) NOT NULL,
	`cn` varchar(64) NOT NULL
	) COMMENT 'GeoIPCountryWhois.csv';

	DROP TABLE IF EXISTS `ip`;
	CREATE TABLE `ip` (
	`start` int(10) unsigned NOT NULL,
	`end` int(10) unsigned NOT NULL,
	`ci` tinyint(3) unsigned NOT NULL
	) COMMENT 'GeoLiteCity-Blocks.csv';
  
END // #PROCEDURE
DELIMITER;
########################################################################

DROP PROCEDURE IF EXISTS `resetWebAnalytics`;

## Written by Richie Bartlett (LoreZyra)
## Stored PROCEDURE for MySQL 5.0 
## Purpose: prepare to import CSV data from MaxMind.com;
## Version: 1.0
DELIMITER //
CREATE DEFINER=`rirodev1`@`localhost` PROCEDURE rblogger0.`resetWebAnalytics`(
) COMMENT 'dumps/resets all web tracking data'
BEGIN
	TRUNCATE TABLE `rblogger0`.`siteReferrer`;
	TRUNCATE TABLE `rblogger0`.`siteTracker`;
	TRUNCATE TABLE `rblogger0`.`site_stats_date`;
	TRUNCATE TABLE `rblogger0`.`site_stats_hour`;
	TRUNCATE TABLE `rblogger0`.`site_stats_month`;
	TRUNCATE TABLE `rblogger0`.`site_stats_year`;
	TRUNCATE TABLE `rblogger0`.`site_stat_Counter`;

END // #PROCEDURE
DELIMITER;
 ```