drop database  if exists   onlineCourses ;

create database   onlineCourses CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

use onlineCourses;

create table user(
	userID int primary key AUTO_INCREMENT,
    userName varchar(100),
    email varchar (100),
    password varchar(100),
    DOB date,
    decentralization int,
    verify int,
    OTP_URL varchar(100)
);

create table subjects (
subjID int primary key,
  subjName varchar (100)
);

create table category (
catID int primary key,
  catName varchar (100),
  subjID int,
  fulltext fulltextCatName(catName)
)ENGINE=InnoDB;


create table course (
courseID int primary key,
  courseName varchar (100),
  title varchar (1000),
  catID int,
  userID  int,  #thong tin giang vien
  thumbnail varchar (100),
  avatar varchar (100),
  fee float,
  subDescription varchar (1000),
  fullDescription varchar (1000),
  isFinished int,
  views float,
  dayPost date,
  lastUpdate date,
  fulltext fulltextCourseName(courseName)
)ENGINE=InnoDB;

create table review (
courseID int,
  userID int,
  rating int,
  content varchar (1000),
  
  primary key (courseID, userID)
);
  
create table courseBought (
courseID int,
  userID int,
  dayBought date,
  
  primary key (courseID, userID)
);

create table watchList (
courseID int ,
  userID int ,
  primary key (courseID, userID)
);

create table cart (
courseID int,
userID int,
  
  primary key (courseID, userID)
);

create table sale (
courseID int primary key,
  percent float
);

create table chapter (
courseID int,
  chapterID int primary key,
  chapterName varchar(1000)
);

create table unit(
unitID int primary key,
  chapterID int,
  unitContent varchar(1000),
  linkVideo varchar (100)
);

DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE `orderdetails` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `orderID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `orderID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `orderDate` datetime,
  `userID` int,
  `total` bigint(20) NOT NULL,
  PRIMARY KEY (`orderID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




insert into user (userID, userName, email, password,DOB, decentralization,verify,OTP_URL) values (1, "Duong Boi Long", "boilongcttg170@gmail.com","123123",'1999-12-12', 0,1,"");
insert into user (userID, userName, email,password, DOB,decentralization,verify,OTP_URL) values (2, "Anh Duc", "anhduc.com","123123", '1999-12-12',0,1,"");
insert into user (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (3, "Anh Tu", "Anhtu@gmail.com", "123123",'1999-12-12',0,1,"");
insert into user (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (4, "Boi Long", "Boi Long@gmail.com","123123", '1999-12-12',1,1,"");
insert into user (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (5, "Winter", "winter@gmail.com", "123123",'1999-12-12',1,1,"");
insert into user (userID, userName, email, password,DOB, decentralization,verify,OTP_URL) values (6, "BoBo", "BoBo@gmail.com", "123123",'1999-12-12',1,1,"");
insert into user (userID, userName, email,password, DOB,decentralization,verify,OTP_URL) values (7, "admin", "admin@gmail.com","admin123",'1999-12-12', 2,1,"");
insert into user (userID, userName, email,password, DOB,decentralization,verify,OTP_URL) values (8, "admin", "admin02@gmail.com","admin123", '1999-12-12',2,1,"");
insert into user (userID, userName, email,password, DOB, decentralization,verify,OTP_URL) values (9, "admin", "admin03@gmail.com","admin123", '1999-12-12',2,1,"");

insert into subjects (subjects.subjID, subjName) values (1, "Web Development");
insert into subjects (subjects.subjID, subjName) values (2, "Mobile Development");


insert into category (category.catID, category.catName, category.subjID) values (1, "HTML", 1);
insert into category (category.catID, category.catName, category.subjID) values (2, "CSS", 1);
insert into category (category.catID, category.catName, category.subjID) values (3, "JQURRY", 1);
insert into category (category.catID, category.catName, category.subjID) values (4, "iOS", 2);
insert into category (category.catID, category.catName, category.subjID) values (5, "Androi", 2);
insert into category (category.catID, category.catName, category.subjID) values (6, "Boootstrap", 1);
insert into category (category.catID, category.catName, category.subjID) values (7, "Javascript", 1);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (1, "Lam quen voi HTML", "title html", 1, 4, "thumbnail", "avata",500000, "sub", "full", 0, 0, '2020-09-09', '2020-09-09');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (2, "HTML nang cao", "title html nang cao", 1, 5, "thumbnail", "avata",500000, "sub", "full", 0, 0, '2020-09-09', '2020-09-09');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (3, "ios Co ban", "title ios", 4, 4, "thumbnail", "avata",500000, "sub", "full", 0, 0, '2020-09-09', '2020-09-09');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (4, "ios nang cao", "title ios nang cao", 4, 4, "thumbnail", "avata",500000, "sub", "full", 0, 0, '2020-09-09', '2020-09-09');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (5, "CSS co abn", "title css co ban", 2,5, "thumbnail", "avata",500000, "sub", "full", 0, 0, '2020-09-09', '2020-09-09');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (6, "CSS nang cao", "title css nang cao", 2, 5, "thumbnail", "avata",500000, "sub", "full", 0, 0, '2020-09-09', '2020-09-09');


insert into coursebought(coursebought.courseID, coursebought.userID, coursebought.dayBought) values (1,1,'2020-09-09');
insert into coursebought(coursebought.courseID, coursebought.userID, coursebought.dayBought) values (1,2,'2020-09-09');
insert into coursebought(coursebought.courseID, coursebought.userID, coursebought.dayBought) values (1,3,'2020-09-09');
insert into coursebought(coursebought.courseID, coursebought.userID, coursebought.dayBought) values (2,1,'2020-09-09');
insert into coursebought(coursebought.courseID, coursebought.userID, coursebought.dayBought) values (2,2,'2020-09-09');
insert into coursebought(coursebought.courseID, coursebought.userID, coursebought.dayBought) values (2,3,'2020-09-09');
insert into coursebought(coursebought.courseID, coursebought.userID, coursebought.dayBought) values (3,3,'2020-09-09');


insert into cart(cart.courseID, cart.userID) values (4,1);
insert into cart(cart.courseID, cart.userID) values (4,2);  
insert into cart(cart.courseID, cart.userID) values (5,1);  
insert into cart(cart.courseID, cart.userID) values (5,2);  
insert into cart(cart.courseID, cart.userID) values (6,1);

insert into watchlist(watchlist.courseID, watchlist.userID) values (1,1);
insert into watchlist(watchlist.courseID, watchlist.userID) values (1,2);
insert into watchlist(watchlist.courseID, watchlist.userID) values (2,1);
insert into watchlist(watchlist.courseID, watchlist.userID) values (2,3);

insert into review (review.courseID, review.userID, review.content, review.rating) values (1,1,"hay",4);
insert into review (review.courseID, review.userID, review.content, review.rating) values (1,2,"tuyet voi",5);
insert into review (review.courseID, review.userID, review.content, review.rating) values (1,3,"hay",5); 
insert into review (review.courseID, review.userID, review.content, review.rating) values (2,1,"hay",5);


insert into chapter (chapter.chapterID, chapter.chapterName, chapter.courseID) values (1,"chuong 1", 1);
insert into chapter (chapter.chapterID, chapter.chapterName, chapter.courseID) values (2,"chuong 2", 1);
insert into chapter (chapter.chapterID, chapter.chapterName, chapter.courseID) values (3,"chuong 1", 2);

insert into unit (unit.unitID, unit.chapterID, unit.unitContent, unit.linkVideo) values (1,1,"noi dung bai 1","link");
insert into unit (unit.unitID, unit.chapterID, unit.unitContent, unit.linkVideo) values (2,1,"noi dung bai 2","link");
insert into unit (unit.unitID, unit.chapterID, unit.unitContent, unit.linkVideo) values (3,2,"nội dung bài 2","link");

insert into sale (courseId,percent) values (1,10);


   select c.catID, c.catName, count(p.courseID) as CourseCount
		from category c left join (select cs.catID as catID, cs.courseID as courseID
                                      from course cs join category cat on cat.catID = cs.catID
                                       where (match (cs.courseName) 
                                            against ('html') or match (cat.catName) against ('html')) )as p
                            on c.catID = p.catID
    group by c.catID, c.catName
    
    
    
    -- hiển thị danh sách khóa học không có search, khong co catid,  khong co sort;

-- hiển thị danh sach khao hoc khong co search, co catid, khong co sort
select c.* from course c, category cat where c.catID = cat.catID
 
 
