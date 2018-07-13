-- create table
DROP TABLE IF EXISTS `url_log`;
CREATE TABLE `url_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL DEFAULT '',
  `hash` int(10) unsigned NOT NULL DEFAULT '0',
  `category` varchar(20) NOT NULL DEFAULT '',
  `creatTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- prodedure for insert
delimiter //
CREATE procedure insertUrl(
  url VARCHAR(255),
  cat varchar(30)
)
BEGIN
INSERT INTO url_log VALUES (NULL,url,crc32(url),cat,now());
end //
delimiter ;

-- show procedure
show create procedure insertUrl;

-- add unique key
alter table url_log add unique(url);

'
http://www.cnblogs.com/coderJiebao/p/Database01.html
',
'
mysql
'
);


