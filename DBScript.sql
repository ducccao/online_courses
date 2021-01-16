drop database  if exists   onlineCourses ;

create database   onlineCourses CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

use onlineCourses;

create table users(
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

CREATE TABLE `unit` (
  `unitID` int NOT NULL,
  `chapterID` int DEFAULT NULL,
  `unitContent` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkVideo` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `flagReviewable` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration_hour` int DEFAULT NULL,
  `duration_min` int DEFAULT NULL,
  `duration_sec` int DEFAULT NULL,
  PRIMARY KEY (`unitID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


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




insert into users (userID, userName, email, password,DOB, decentralization,verify,OTP_URL) values (1, "Duong Boi Long", "boilongcttg170@gmail.com","123123",'1999-12-12', 0,1,"");
insert into users (userID, userName, email,password, DOB,decentralization,verify,OTP_URL) values (2, "Anh Duc", "anhduc.com","123123", '1999-12-12',0,1,"");
insert into users (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (3, "Anh Tu", "Anhtu@gmail.com", "123123",'1999-12-12',0,1,"");
insert into users (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (4, "Boi Long", "Boi Long@gmail.com","123123", '1999-12-12',1,1,"");
insert into users (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (5, "Winter", "winter@gmail.com", "123123",'1999-12-12',1,1,"");
insert into users (userID, userName, email, password,DOB, decentralization,verify,OTP_URL) values (6, "BoBo", "BoBo@gmail.com", "123123",'1999-12-12',1,1,"");
insert into users (userID, userName, email,password, DOB,decentralization,verify,OTP_URL) values (7, "admin", "admin@gmail.com","admin123",'1999-12-12', 2,1,"");
insert into users (userID, userName, email,password, DOB,decentralization,verify,OTP_URL) values (8, "admin", "admin02@gmail.com","admin123", '1999-12-12',2,1,"");
insert into users (userID, userName, email,password, DOB, decentralization,verify,OTP_URL) values (9, "admin", "admin03@gmail.com","admin123", '1999-12-12',2,1,"");
insert into users (userID, userName, email, password,DOB, decentralization,verify,OTP_URL) values (10, "Olin Hintz", "boilongcttg0@gmail.com","123123",'1999-12-12', 0,1,"");
insert into users (userID, userName, email,password, DOB,decentralization,verify,OTP_URL) values (11, "Janelle Pacocha", "anhduc@abc.com","123123", '1999-12-12',0,1,"");
insert into users (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (12, "Obie Ullrich", "ObieUllrich@gmail.com", "123123",'1999-12-12',0,1,"");
insert into users (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (13, "Miss Vergie Hills", "MissVergieHills@gmail.com","123123", '1999-12-12',1,1,"");

insert into subjects (subjects.subjID, subjName) values (1, "Web Development");
insert into subjects (subjects.subjID, subjName) values (2, "Mobile Development");


insert into category (category.catID, category.catName, category.subjID) values (1, "Front End", 1);
insert into category (category.catID, category.catName, category.subjID) values (2, "Angular", 1);
insert into category (category.catID, category.catName, category.subjID) values (3, "PHP", 1);
insert into category (category.catID, category.catName, category.subjID) values (4, "iOS", 2);
insert into category (category.catID, category.catName, category.subjID) values (5, "ANDROID", 2);
insert into category (category.catID, category.catName, category.subjID) values (6, "React", 1);
insert into category (category.catID, category.catName, category.subjID) values (7, "Node.Js", 1);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (1, "Beginner Full Stack Web Development: HTML, CSS, React & Node", "Learn web development with HTML, CSS, Bootstrap 4, ES6 React and Node
", 1, 4, "thumbnail", "avata",450000, "Build websites with HTML & CSS
Build backend servers & APIs with Node and Express
Work with NoSQL databases like MongoDB
Build full-stack web apps with Facebook's React Framework
Build mobile-friendly websites with Bootstrap 4 & CSS", "Welcome to the Ultimate Web Developer Bootcamp. This is your one-stop-shop to learn front-end AND back-end development.

We'll take you from absolute beginner to competent full-stack web developer in a matter of weeks.

WHO SHOULD TAKE THIS COURSE?

Anyone who is curious about programming
Entrepreneurs
Those looking for a career change
Serious coders & hobbyists
Students & teenagers
Anyone who wants to learn web development
WHAT YOU WILL LEARN

HTML5
CSS3
Javascript
Bootstrap 4
DOM Manipulation
NPM
Node
MongoDB
REST
Express
ES6
React", 0, 0, '2020-12-09', '2021-01-09');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (2, "Web Design for Beginners: Real World Coding in HTML & CSS", "Launch a career as a web designer by learning HTML5, CSS3, responsive design, Sass and more!", 1, 5, "thumbnail", "avata",300000, "Create any website layout you can imagine
Support any device size with Responsive (mobile-friendly) Design
Add tasteful animations and effects with CSS3
Use common vocabulary from the design industry", "You can launch a new career in web development today by learning HTML & CSS. You don't need a computer science degree or expensive software. All you need is a computer, a bit of time, a lot of determination, and a teacher you trust. I've taught HTML and CSS to countless coworkers and held training sessions for fortune 100 companies. I am that teacher you can trust. 

Don't limit yourself by creating websites with some cheesy site-builder tool. This course teaches you how to take 100% control over your webpages by using the same concepts that every professional website is created with.

This course does not assume any prior experience. We start at square one and learn together bit by bit. By the end of the course you will have created (by hand) a website that looks great on phones, tablets, laptops, and desktops alike.", 0, 0, '2020-12-09', '2020-12-30');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (3, "iOS & Swift - The Complete iOS App Development Bootcamp", "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!", 4, 4, "thumbnail", "avata",750000, "Be able to build any app you want
Start your own app based business
Create a portfolio of apps to apply for junior developer jobs at a technology company
Become a digital nomad by working as a freelance iOS developer
Learn to work with Apple's latest UI Framework - SwiftUI
Master creating Augmented Reality apps using Apple’s new ARKit
Create apps that use Machine Learning using Apple’s new CoreML", "Welcome to the Complete iOS App Development Bootcamp. With over 39,000 5 star ratings and a 4.8 average my iOS course is the HIGHEST RATED iOS Course in the history of Udemy!

At 55+ hours, this iOS 13 course is the most comprehensive iOS development course online!

This Swift 5.1 course is based on our in-person app development bootcamp in London, where we've perfected the curriculum over 4 years of in-person teaching.", 0, 0, '2021-01-13', '2021-01-13');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (4, "The Complete iOS 10 & Swift 3 Developer Course", "Learn iOS App Development by building 21 iOS apps using Swift 3 & Xcode 8. Includes free web hosting, assets & ebook.", 4, 4, "thumbnail", "avata",600000, "Develop any iOS app you want
Build apps for your business or organisation
Get app development jobs on freelancer sites", "You’re here because you want to build your own apps, right?

Smart move, my friend.

Or maybe you already do… but you want to be bigger, bolder, BETTER.

Well, thanks to the incredible new ios 10, now you can—and if you start today, you canbeat the pack and start building your very own white-hot apps in just six weeks.", 0, 0, '2020-09-09', '2020-09-09');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (5, "PHP for Beginners - Become a PHP Master - CMS Project", "PHP for Beginners: learn everything you need to become a professional PHP developer with practical exercises & projects.", 3,5, "thumbnail", "avata",500000, "You will learn to create a (CMS) Content Management System like WordPress, Drupal or Joomla
You will learn how to use Databases
You will learn MySQL
Object Oriented Programming
You will learn how to launch your application online
How to use forms to submit data to databases", "One of the biggest PHP Courses in UDEMY ........

Best Rated PHP course on UDEMY......

Over 90,000 Students taking this course already.........

BEST Reviewed PHP beginners course for a reason.....", 0, 0, '2021-01-05', '2021-01-09');
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (6, "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)", "Master Node JS & Deno.js, build REST APIs with Node.js, GraphQL APIs, add Authentication, use MongoDB, SQL & much more!", 7, 5, "thumbnail", "avata",550000, "Work with one of the most in-demand web development programming languages
Learn the basics as well as advanced concepts of NodeJS in great detail
Build modern, fast and scalable server-side web applications with NodeJS, databases like SQL or MongoDB and more
Understand the NodeJS ecosystem and build server-side rendered apps, REST APIs and GraphQL APIs
Get a thorough introduction to DenoJS", "Join the most comprehensive Node.js course on Udemy and learn Node in both a practical as well as theory-based way!

---

This course was updated to also include sections on Deno.js - in addition to more than 30 hours of content on Node.js!

---", 0, 0, '2021-01-01', '2021-01-09');

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (7, "Learn and Understand NodeJS", "Dive deep under the hood of NodeJS. Learn V8, Express, the MEAN stack, core Javascript concepts, and more.", 7, 5, "thumbnail", "avata",200000, 
"Grasp how NodeJS works under the hood
Understand the Javascript and technical concepts behind NodeJS
Structure a Node application in modules
Understand and use the Event Emitter
Understand Buffers, Streams, and Pipes
Build a Web Server in Node and understand how it really works
Use npm and manage node packages
Build a web application and API more easily using Express", "NodeJS is a rapidy growing web server technology, and Node developers are among the highest paid in the industry. Knowing NodeJS well will get you a job or improve your current one by enabling you to build high quality, robust web applications.

In this course you will gain a deep understanding of Node, learn how NodeJS works under the hood, and how that knowledge helps you avoid common pitfalls and drastically improve your ability to debug problems.", 0, 0, '2021-01-01', '2021-01-09');

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (8, "Web Scraping in Nodejs & JavaScript", "Learn web scraping in Nodejs & JavaScript by example projects with real websites! Craiglist, iMDB, AirBnB and more!", 7, 5, "thumbnail", "avata",600000, 
"Be able to scrape jobs from a page on Craigslist
Learn how to use Request
Learn how to use NightmareJS
Learn how to use Puppeteer
Learn how to scrape elements without any identifiable classes or id's
Learn how to save scraping data to CSV
Learn how to save scraping data to MongoDb", "In this course you will learn how to scrape a websites, with practical examples on real websites using JavaScript Nodejs Request, Cheerio, NightmareJs and Puppeteer. You will be using the newest JavaScript ES7 syntax with async/await.", 0, 0, '2021-01-01', '2021-01-09');


insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (9, "React - The Complete Guide (incl Hooks, React Router, Redux)", "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!", 6, 5, "thumbnail", "avata",240000, 
"Build powerful, fast, user-friendly and reactive web apps
Provide amazing user experiences by leveraging the power of JavaScript with ease
Apply for high-paid jobs or work as a freelancer in one the most-demanded sectors you can find in web dev right now
Learn React Hooks & Class-based Components
", "This course is fully up-to-date with the latest version of React and includes React Hooks! Of course it will be kept up-to-date in the future.

---

What's this course about?

Learn React or dive deeper into it. Learn the theory, solve assignments, practice in demo projects and build one big application which is improved throughout the course: The Burger Builder!", 0, 0, '2021-01-01', '2021-01-09');



insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (10, "Node with React: Fullstack Web Development", "Build and deploy fullstack web apps with NodeJS, React, Redux, Express, and MongoDB.", 6, 5, "thumbnail", "avata",300000, 
"Create boilerplate starter projects with React, Redux, Express, and Mongo
Understand common web technologies and design patterns to connect them together
Master deployment techniques between the production and development environments
Make an app with Google OAuth authentication
", "Note: This course assumes you've got the basics of React and Redux down.  Check out my course 'Modern React with Redux', its the perfect preparation!

Go beyond the basics of React and Redux!  This course will teach you to combine the ultra-popular React, Redux, Express, and MongoDB technologies to build a fullstack web application.


Advanced Deployment? You will learn it.  Billing/Payments? Included.  Handling Email? Of course!", 0, 0, '2021-01-11', '2021-01-09');

insert into orders(orderID, orderDate, userID, total) values(1,'2020-09-09',1, 450000);
insert into orders(orderID, orderDate, userID, total) values(2,'2020-09-09',1, 0);
insert into orders(orderID, orderDate, userID, total) values(3,'2020-09-09',2, 600000);
insert into orders(orderID, orderDate, userID, total) values(4,'2020-09-09',2, 450000);
insert into orders(orderID, orderDate, userID, total) values(5,'2020-09-09',3, 450000);
insert into orders(orderID, orderDate, userID, total) values(6,'2020-09-09',10, 1100000);
insert into orders(orderID, orderDate, userID, total) values(7,'2020-09-09',11, 0);

insert into orderdetails(orderdetails.ID, orderdetails.orderID, orderdetails.courseID, orderdetails.price, orderdetails.quantity, orderdetails.amount) values
(1,1,1,450000,1,1);
insert into orderdetails(orderdetails.ID, orderdetails.orderID, orderdetails.courseID, orderdetails.price, orderdetails.quantity, orderdetails.amount) values
(2,3,1,450000,1,1);
insert into orderdetails(orderdetails.ID, orderdetails.orderID, orderdetails.courseID, orderdetails.price, orderdetails.quantity, orderdetails.amount) values
(4,1,5,500000,1,1);
insert into orderdetails(orderdetails.ID, orderdetails.orderID, orderdetails.courseID, orderdetails.price, orderdetails.quantity, orderdetails.amount) values
(5,4,1,450000,1,1);
insert into orderdetails(orderdetails.ID, orderdetails.orderID, orderdetails.courseID, orderdetails.price, orderdetails.quantity, orderdetails.amount) values
(6,5,1,450000,1,1);
insert into orderdetails(orderdetails.ID, orderdetails.orderID, orderdetails.courseID, orderdetails.price, orderdetails.quantity, orderdetails.amount) values
(7,6,4,600000,1,1);
insert into orderdetails(orderdetails.ID, orderdetails.orderID, orderdetails.courseID, orderdetails.price, orderdetails.quantity, orderdetails.amount) values
(8,6,5,500000,1,1);



insert into review (review.courseID, review.userID, review.content, review.rating) values (1,1,"This was the first course I saw when I came on Udemy, and I am thankful for the Instructors input as they taught me a lot about Web Development and Full Stack Development. ",4);
insert into review (review.courseID, review.userID, review.content, review.rating) values (1,2,"Good one! Slowly, but surely explained everything. Not too long, chapters made to the point. All what is needed is said. Already had some experience with HTML5 and CSS, but decided to go for another course just to maybe see some new things, or get more explanations",5);
insert into review (review.courseID, review.userID, review.content, review.rating) values (1,3,"The course goes above and beyond by not only teaching you the necessary skills to learn the basics of HTML5 and CSS3, but by also providing great resources to expand your knowledge and skills.",4); 


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




insert into chapter (chapter.chapterID, chapter.chapterName, chapter.courseID) values (1,"chuong 1", 1);
insert into chapter (chapter.chapterID, chapter.chapterName, chapter.courseID) values (2,"chuong 2", 1);
insert into chapter (chapter.chapterID, chapter.chapterName, chapter.courseID) values (3,"chuong 1", 2);


LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,1,'noi dung bai 1','link','1',0,12,42),(2,1,'noi dung bai 2','link','0',0,11,23),(3,1,'nội dung bài 3','link','0',0,21,52),(4,2,'noi dung bai 1','link','1',0,12,41),(5,2,'noi dung bai 2','link','0',0,4,48),(6,2,'nội dung bài 3','link','0',0,21,38),(7,3,'noi dung bai 1','link','1',0,12,28),(8,3,'noi dung bai 2','link','0',0,8,33),(9,3,'nội dung bài 3','link','0',0,5,37),(10,4,'noi dung bai 1','link','1',0,12,47),(11,4,'noi dung bai 2','link','0',0,19,26),(12,4,'nội dung bài 3','link','0',0,12,12),(13,6,'noi dung bai 2','link','0',0,19,47),(14,7,'nội dung bài 1','link','0',0,21,26),(15,7,'noi dung bai 2','link','1',0,11,13),(16,8,'noi dung bai 1','link','0',0,9,11),(17,8,'nội dung bài 2','link','0',0,15,6),(18,9,'noi dung bai 1','link','0',0,12,24),(19,9,'nội dung bài 2','link','0',0,31,49),(20,5,'noi dung bai 1','link','1',0,12,27),(21,5,'noi dung bai 2','link','0',0,22,23),(22,6,'nội dung bài 1','link','0',0,25,23);
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;

insert into sale (courseId,percent) values (1,10);
