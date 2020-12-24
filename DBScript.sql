
drop database  if exists   onlineCourses ;

create database   onlineCourses CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci';

use onlineCourses;

create table user(
	userID int primary key AUTO_INCREMENT,
    userName varchar(100),
    email varchar (100),
    password varchar(100),
    DOB date,
    decentralization int
);


create table category (
	catID int primary key,
    catName varchar (100),
    catLevel int
);


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
    lastUpdate date
);

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



insert into user (userID, userName, email, password,DOB, decentralization) values (1, "Duong Boi Long", "boilongcttg170@gmail.com","123",'1999-12-12', 0);
insert into user (userID, userName, email,password, DOB,decentralization) values (2, "Anh Duc", "anhduc.com","123", '1999-12-12',0);
insert into user (userID, userName, email, password ,DOB,decentralization) values (3, "Anh Tu", "Anhtu@gmail.com", "123",'1999-12-12',0);
insert into user (userID, userName, email, password ,DOB,decentralization) values (4, "Boi Long", "Boi Long@gmail.com","123", '1999-12-12',1);
insert into user (userID, userName, email, password ,DOB,decentralization) values (5, "Winter", "winter@gmail.com", "123",'1999-12-12',1);
insert into user (userID, userName, email, password,DOB, decentralization) values (6, "BoBo", "BoBo@gmail.com", "123",'1999-12-12',1);
insert into user (userID, userName, email,password, DOB,decentralization) values (7, "admin", "admin@gmail.com","admin",'1999-12-12', 2);
insert into user (userID, userName, email,password, DOB,decentralization) values (8, "admin", "admin02@gmail.com","admin", '1999-12-12',2);
insert into user (userID, userName, email,password, DOB, decentralization) values (9, "admin", "admin03@gmail.com","admin", '1999-12-12',2);




insert into category (category.catID, category.catName, category.catLevel) values (1, "HTML", 0);
insert into category (category.catID, category.catName, category.catLevel) values (2, "CSS", 0);
insert into category (category.catID, category.catName, category.catLevel) values (3, "JQURRY", 0);
insert into category (category.catID, category.catName, category.catLevel) values (4, "iOS", 1);
insert into category (category.catID, category.catName, category.catLevel) values (5, "Androi", 1);
insert into category (category.catID, category.catName, category.catLevel) values (6, "Boootstrap", 0);
insert into category (category.catID, category.catName, category.catLevel) values (7, "Javascript", 0);

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









    
    
    