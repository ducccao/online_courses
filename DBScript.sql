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
  fullDescription varchar (7000),
  isFinished int,
  views float,
  dayPost date,
  lastUpdate date,
  isDisabled int,
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
insert into users (userID, userName, email, password ,DOB,decentralization,verify,OTP_URL) values (4, "Boi Long", "bl@gmail.com","123123", '1999-12-12',1,1,"");
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

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (1, "Beginner Full Stack Web Development: HTML, CSS, React & Node", "Learn web development with HTML, CSS, Bootstrap 4, ES6 React and Node
", 1, 4, "thumbnail", "./public/courses/course-1/ava.jpg",450000, "Build websites with HTML & CSS
Build backend servers & APIs with Node and Express
Work with NoSQL databases like MongoDB
Build full-stack web apps with Facebook's React Framework
Build mobile-friendly websites with Bootstrap 4 & CSS", "<p>Welcome to the Ultimate Web&nbsp;Developer Bootcamp. This is your one-stop-shop to&nbsp;<strong>learn front-end AND back-end development</strong>.</p>
<p>We'll take you from absolute beginner to competent full-stack web developer in a matter of weeks.</p>
<p><strong>WHO&nbsp;SHOULD&nbsp;TAKE&nbsp;THIS&nbsp;COURSE?</strong></p>
<ul>
<li>Anyone who is curious about programming</li>
<li>Entrepreneurs</li>
<li>Those looking for a career change</li>
<li>Serious coders &amp;&nbsp;hobbyists</li>
<li>Students &amp;&nbsp;teenagers</li>
<li>Anyone who wants to learn web development</li>
</ul>
<p><strong>WHAT&nbsp;YOU&nbsp;WILL&nbsp;LEARN</strong></p>
<ul>
<li>HTML5</li>
<li>CSS3</li>
<li>Javascript</li>
<li>Bootstrap 4</li>
<li>DOM&nbsp;Manipulation</li>
<li>NPM</li>
<li>Node</li>
<li>MongoDB</li>
<li>REST</li>
<li>Express</li>
<li>ES6</li>
<li>React</li>
</ul>
<p>&nbsp;</p>", 0, 0, '2020-12-09', '2021-01-09',0);
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate,isDisabled)
values (2, "Web Design for Beginners: Real World Coding in HTML & CSS", "Launch a career as a web designer by learning HTML5, CSS3, responsive design, Sass and more!", 1, 5, 
"thumbnail", "./public/courses/course-2/ava.jpg",300000, "Create any website layout you can imagine
Support any device size with Responsive (mobile-friendly) Design
Add tasteful animations and effects with CSS3
Use common vocabulary from the design industry",'<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div>
<div data-purpose="safely-set-inner-html:description:description">
<p><strong><em>I have helped over 100,000 students and have received the following feedback:&nbsp;&nbsp;</em></strong>&nbsp;</p>
<p>&ldquo;&hellip;A fantastic course&hellip; clear, definite and engaging."</p>
<p>&ldquo;&hellip;Presentation is concise without being tedious&hellip; you honestly feel that you have a thorough understanding of the subject."</p>
<p>&ldquo;&hellip;[Brad] explained the process. Not memorize this or that, he explained the process. If you are looking to take a course to understand the foundations of creating websites, look no further."</p>
<p>&ldquo;Brad definitely has some of the best techniques to embed the lesson into your mind&hellip; hands down these are the best tutorials I have had the opportunity to view."</p>
<p>&ldquo;I found this course really helpful and I highly recommend it&hellip; all things you learn are seen in action instantly."</p>
<p>&ldquo;Brad has put together a great foundation for any body wishing to get a good understanding with front end web-development."</p>
<p>&ldquo;&hellip;I would definitely recommend this course to most folks I know who want to learn web design."</p>
</div>
<div class="styles--audience--2pZ0S" data-purpose="target-audience">
<h2 class="udlite-heading-xl styles--audience__title--1Sob_">Who this course is for:</h2>
<ul class="styles--audience__list--3NCqY">
<li>Anyone who wants to build websites the "professional" way</li>
<li>Anyone who has practiced web design as a hobby but is not confident about their skillset in a professional arena</li>
<li>Experienced developers looking to renew their HTML5 &amp; CSS3 knowledge</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="course-landing-page__main-content component-margin">&nbsp;</div>"', 0, 0, '2020-12-09', '2020-12-30',0);
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (3, "iOS & Swift - The Complete iOS App Development Bootcamp", 
"From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!", 4, 4, "thumbnail", "./public/courses/course-3/ava.jpg",750000, "Be able to build any app you want
Start your own app based business
Create a portfolio of apps to apply for junior developer jobs at a technology company
Become a digital nomad by working as a freelance iOS developer
Learn to work with Apple's latest UI Framework - SwiftUI
Master creating Augmented Reality apps using Apple’s new ARKit
Create apps that use Machine Learning using Apple’s new CoreML",
 '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>Sign up today, and look forwards to:</strong></p>
<ul>
<li>
<p>Over 55 hours of HD 1080p video content, everything youll ever need to succeed as a iOS developer.</p>
</li>
<li>
<p>Building over 25 fully-fledged apps including ones that use machine learning and augmented reality</p>
</li>
<li>
<p>All the knowledge you need to start building any app you want</p>
</li>
<li>
<p>A giant bundle of design assets</p>
</li>
<li>
<p>Our best selling 12 Rules to Learn to Code eBook</p>
</li>
<li>
<p>$8000+ app development bootcamp course materials and curriculum</p>
</li>
</ul>
<p><strong>From Beginner to iOS 13 App Developer with Just One Course</strong></p>
<p>We know that youre here because you value your time. If you wanted to watch someone program for hours and hours without explaining what theyre doing, youd be on YouTube.</p>
<p>By getting this course, you can be rest assured that the course is carefully thought out and edited. There are beautiful animations that explain all the difficult concepts and the videos are&nbsp;<strong>fully up to date</strong>&nbsp;with the latest versions of Swift and Xcode.</p>
<p>So by the end of the course, youll completely understand:</p>
<ul>
<li>
<p>Concepts of Object Oriented Programming (OOP): The type system, variables, functions and methods, inheritance, structures, classes and protocols.</p>
</li>
<li>
<p>Control Structures: Using If/&shy;Else clauses, Switch statements and logic to control the flow of execution.</p>
</li>
<li>
<p>Data Structures: How to work with collections, such as arrays and dictionaries.</p>
</li>
<li>
<p>Software Design: How to organise and format code for readability and how to implement the Model &shy;View&shy; Controller (MVC) design pattern, Apples favourite delegation pattern and the publisher pattern.</p>
</li>
<li>
<p>Networking: How to make asynchronous API calls, store and retrieve data from the cloud, and use the JSON format for server communication.</p>
</li>
<li>
<p>Persistent Local Data Storage: How to use Core Data, Realm, Codable and User Defaults to store your app data locally.</p>
</li>
<li>
<p>How to Implement In-App Purchases with Apple StoreKit</p>
</li>
<li>
<p>Machine Learning: How to make artificially intelligent apps and build your own machine learning models using iOS 13s new CoreML2 and CreateML frameworks.</p>
</li>
<li>
<p>Augmented Reality: How to create 3D objects in augmented reality and create incredible 3D animations and real-life interactions using Apples latest ARKit2 framework.</p>
</li>
<li>
<p>SwiftUI: How to use Apples brand new UI framework to create user interfaces programmatically that look good across all Apple products.</p>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>',
 0, 0, '2021-01-13', '2021-01-13',0);
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (4, "The Complete iOS 10 & Swift 3 Developer Course", 
"Learn iOS App Development by building 21 iOS apps using Swift 3 & Xcode 8. Includes free web hosting, assets & ebook.", 4, 4, "thumbnail", "./public/courses/course-4/ava.jpg",600000, "Develop any iOS app you want
Build apps for your business or organisation
Get app development jobs on freelancer sites", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong class="redactor-inline-converted">So much power at your fingertips&hellip; imagine what you could do?</strong></p>
<p><em class="redactor-inline-converted">I didnt know how to make apps one week ago thinking it was way too hard. Now, Im releasing my first app to the App Store. &ndash; F. Ammache&nbsp;</em></p>
<p><em class="redactor-inline-converted">I love the classes, the challenges, and being able to sort things out I did not know before. Thanks Rob, you made it easy and exciting to learn. &ndash; L. Smith</em></p>
<p><strong class="redactor-inline-converted">Sign up today, and here&rsquo;s what you&rsquo;ll get:</strong></p>
<ul>
<li>Over 30 hours of meticulously produced content</li>
<li>All the knowledge you need to get moving with ios 10 - SiriKit, Messages and Maps</li>
<li>Apps and HomeKit</li>
<li>HD 1080p</li>
</ul>
<p>&nbsp;</p>
<p><strong class="redactor-inline-converted">PLUS!!! Bonus material to take you to the next level</strong></p>
<ul>
<li>Unlimited web hosting for one year (worth $200) *Limited to one year per student not per course*</li>
<li>A copy of my most popular ebook How To Earn $10,000 While Learning To Code&mdash;rated 5-Stars on Amazon</li>
<li>Over 1,000 graphical assets (backgrounds, buttons and icons etc.), worth a whopping $300, to use in your apps.</li>
</ul>
<ul>
<li>And not forgetting: $50 of AWS credit.</li>
</ul>
<p>&nbsp;</p>
<p>So, if you&rsquo;re ready to join the ios 10 revolution and become an app developer today, sign up now and power-up your skills in record time.</p>
<p><em class="redactor-inline-converted">I can&rsquo;t believe how easy and convenient the course is, I can take study anywhere. -- K Dixon</em></p>
<p><em class="redactor-inline-converted">I love the way Rob introduces and explains the different concepts be it simple or difficultones. It is explained very well for anyone who has no prior knowledge of iOS programming.</em></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2020-09-09', '2020-09-09',0);
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (5, "PHP for Beginners - Become a PHP Master - CMS Project", 
"PHP for Beginners: learn everything you need to become a professional PHP developer with practical exercises & projects.", 3,5, "thumbnail", "./public/courses/course-5/ava.jpg",500000, "You will learn to create a (CMS) Content Management System like WordPress, Drupal or Joomla
You will learn how to use Databases
You will learn MySQL
Object Oriented Programming
You will learn how to launch your application online
How to use forms to submit data to databases",'<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<h2 class="udlite-heading-xl what-you-will-learn--title--hropy">What yoll learn</h2>
<div class="what-you-will-learn--content-spacing--3btHJ show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div>
<ul class="unstyled-list udlite-block-list what-you-will-learn--objectives-list--2cWZN">
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn to create a (CMS) Content Management System like WordPress, Drupal or Joomla</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn how to use Databases</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn MySQL</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">Object Oriented Programming</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn how to launch your application online</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">How to use forms to submit data to databases</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">How to use AJAX to submit data to the server without refreshing the page</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn about PHP security</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn about sessions</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">Password hashing</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">Email sending</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn to use composer (PHP package manager)</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn to create clean URLs and remove the .php from files</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn to use bootstrap by getting experience from the project</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn to debug your code</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn to create pagination</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will code refactoring</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn to debug (fix your code)</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">You will learn to use an API to bring data from a database to a graphical interface</div>
</div>
</li>
<li>
<div class="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm" data-purpose="objective">
<div class="udlite-block-list-item-content">There is so much more and my hands are just tired of typing :)</div>
</div>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-05', '2021-01-09',0);
insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (6, "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)",
 "Master Node JS & Deno.js, build REST APIs with Node.js, GraphQL APIs, add Authentication, use MongoDB, SQL & much more!", 7, 5, "thumbnail", "./public/courses/course-6/ava.jpg",550000, "Work with one of the most in-demand web development programming languages
Learn the basics as well as advanced concepts of NodeJS in great detail
Build modern, fast and scalable server-side web applications with NodeJS, databases like SQL or MongoDB and more
Understand the NodeJS ecosystem and build server-side rendered apps, REST APIs and GraphQL APIs
Get a thorough introduction to DenoJS", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>Join the most comprehensive Node.js course on Udemy and learn Node in both a practical as well as theory-based way!</strong></p>
<p>---</p>
<p><strong>This course was updated to also include sections on Deno.js - in addition to more than 30 hours of content on Node.js!</strong></p>
<p>---</p>
<p>Node.js is probably&nbsp;<strong>THE most popular&nbsp;</strong>and modern server-side programming language you can dive into these days!</p>
<p>Node.js developers are in high demand and the language is used for everything from traditional web apps with&nbsp;<strong>server-side rendered views</strong>&nbsp;over&nbsp;<strong>REST&nbsp;APIs</strong>&nbsp;all the way up to&nbsp;<strong>GraphQL APIs</strong>&nbsp;and&nbsp;<strong>real-time web services</strong>. Not to mention its applications in build workflows for projects of all sizes.</p>
<p><strong>This course will teach you all of that!</strong>&nbsp;From scratch with zero prior knowledge assumed. Though if you do bring some knowledge, youll of course be able to quickly jump into the course modules that are most interesting to you.</p>
<p><strong>Herewhat youll learn in this course:</strong></p>
<ul>
<li>
<p>Node.js Basics &amp;&nbsp;Basic Core Modules</p>
</li>
<li>
<p>Parsing Requests &amp;&nbsp;Sending Responses</p>
</li>
<li>
<p>Rendering HTML&nbsp;Dynamically (on the Server)</p>
</li>
<li>
<p>Using Express.js</p>
</li>
<li>
<p>Working with Files and generating PDFs on the Server (on-the-fly)</p>
</li>
<li>
<p>File Up- and Download</p>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-01', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (7, "Learn and Understand NodeJS", "Dive deep under the hood of NodeJS. Learn V8, Express, the MEAN stack, core Javascript concepts, and more.", 7, 5, "thumbnail", "./public/courses/course-7/ava.jpg",200000, 
"Grasp how NodeJS works under the hood
Understand the Javascript and technical concepts behind NodeJS
Structure a Node application in modules
Understand and use the Event Emitter
Understand Buffers, Streams, and Pipes
Build a Web Server in Node and understand how it really works
Use npm and manage node packages
Build a web application and API more easily using Express",'<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p>In this course you will gain a deep understanding of Node, learn how NodeJS works under the hood, and how that knowledge helps you avoid common pitfalls and&nbsp;<em>drastically improve your ability to debug problems</em>.</p>
<p>In this course well look at&nbsp;<strong>how the C++ written V8 Javascript engine works and how NodeJS uses it to expand the abilities of Javascript</strong>. Youll learn how to structure your code for reuse and to be easier to understand, manage, and expand using&nbsp;<strong>modules and understand how modules really work</strong>.</p>
<p>Youll learn&nbsp;<strong>how asynchronous code works in Node and the Node event loop</strong>, as well as how to use the&nbsp;<strong>event emitter, streams, buffers, pipes, and work with files</strong>. Well see how that leads to&nbsp;<strong>building a web server in Node</strong>.</p>
<p>Well dive into<strong>&nbsp;web sites, web apps and APIs with Express</strong>&nbsp;and learn how Express can save us time as Node developers.</p>
<p>Youll also gain an understanding of&nbsp;<strong>npm, connecting to databases, and the MEAN stack</strong>!</p>
<p>During it all youll gain a deep understanding of the Javascript concepts and other computer science concepts that power Node.</p>
<p>NodeJS doesnt have to be hard to learn. The biggest mistake most coding tutorials make is expecting someone to learn simply by imitating others code. Real world situations are never exactly like the tutorial.</p>
<p>I believe the best way to learn is to understand how a tool works and what it does for you, look at examples, and then try it yourself. Thats how this course is built, with the goal to help you both learn and understand NodeJS.</p>
<p><em>Note: In this course youll also get&nbsp;</em><strong><em>downloadable source code</em></strong><em>. You will often be provided wittartercode, giving you the base for you to start  code to compare your code to.</em></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-01', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (8, "Web Scraping in Nodejs & JavaScript", "Learn web scraping in Nodejs & JavaScript by example projects with real websites! Craiglist, iMDB, AirBnB and more!", 7, 5, "thumbnail", "./public/courses/course-8/ava.jpg",600000, 
"Be able to scrape jobs from a page on Craigslist
Learn how to use Request
Learn how to use NightmareJS
Learn how to use Puppeteer
Learn how to scrape elements without any identifiable classes or id's
Learn how to save scraping data to CSV
Learn how to save scraping data to MongoDb", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p>In this course you will learn how to scrape a websites, with practical examples on&nbsp;<strong>real websites</strong>&nbsp;using JavaScript Nodejs&nbsp;<strong>Request</strong>,&nbsp;<strong>Cheerio</strong>,&nbsp;<strong>NightmareJs&nbsp;</strong>and&nbsp;<strong>Puppeteer</strong>. You will be using the&nbsp;<strong>newest JavaScript ES7 syntax</strong>&nbsp;with async/await.</p>
<p>You will learn how to scrape a Craigslist website for software engineering jobs, using Nodejs Request and Cheerio. You will be using the newest JavaScript ES7 syntax with async/await.</p>
<p>You will then learn how to scrape more advanced websites that require JavaScript such as&nbsp;<strong>iMDB</strong>&nbsp;and&nbsp;<strong>AirBnB</strong>&nbsp;using&nbsp;<strong>NighmareJs</strong>&nbsp;and&nbsp;<strong>Puppeteer</strong>.</p>
<p>&nbsp;</p>
<p>Im gong to also show you with a practical real-life website, how you can even&nbsp;<strong>avoid wasting time on creating a web scraper</strong>&nbsp;in the first place, by&nbsp;<strong><em>reverse engineering websites and finding their hidden API</em></strong>!</p>
<p>&nbsp;</p>
<p>Learn how to&nbsp;<strong>avoid being blocked from websites when developing out your scraper</strong>, by&nbsp;<strong>building out the scraper in a test-driven way with mocked html</strong>, rather than hitting the website every time as youre debugging and developing it. Youll also learn&nbsp;<strong>what you can do if youre blocked</strong>&nbsp;and your&nbsp;<strong>alternatives to get your scraper up and running</strong>&nbsp;regardless!</p>
<p>&nbsp;</p>
<p>You will also learn how to scrape on a server with a bad connection, or even if you have a bad connection.</p>
<p>Youll even learn how to&nbsp;<strong>save your results to a CSV&nbsp;file and MongoDB</strong>!</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-01', '2021-01-09',0);


insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (9, "React - The Complete Guide (incl Hooks, React Router, Redux)", "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!", 6, 5, "thumbnail", "./public/courses/course-9/ava.jpg",240000, 
"Build powerful, fast, user-friendly and reactive web apps
Provide amazing user experiences by leveraging the power of JavaScript with ease
Apply for high-paid jobs or work as a freelancer in one the most-demanded sectors you can find in web dev right now
Learn React Hooks & Class-based Components
", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>This course is fully up-to-date with the latest version of React and includes React Hooks! Of course it will be kept up-to-date in the future.</strong></p>
<p>---</p>
<p><strong>Whats this course about?</strong></p>
<p>Learn React or dive deeper into it.&nbsp;Learn the theory, solve assignments, practice in demo projects and build one big application which is improved throughout the course:&nbsp;The Burger Builder!</p>
<p><strong>More details please!</strong></p>
<p>JavaScript is the&nbsp;<strong>major driver</strong>&nbsp;of modern web applications since its the only programming language which runs in the browser and hence allows you to provide highly reactive apps. Youll be able to achieve mobile-app like user experiences in the web.</p>
<p>But using JavaScript&nbsp;<strong>can be challenging</strong>&nbsp;- it quickly becomes overwhelming to create a nice web app with vanilla JavaScript and jQuery only.</p>
<p><strong>React to the rescue!&nbsp;</strong></p>
<p><strong>React is all about components</strong>&nbsp;- basically custom HTML&nbsp;elements - with which you can quickly build amazing and powerful web apps. Just build a component once, configure it to your needs, dynamically pass data into it (or listen to your own events!) and re-use it as often as needed.</p>
<p>Need to display a list of users in your app?&nbsp;Its as simple as creating a "User"&nbsp;component and outputting it as often as needed.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-01', '2021-01-09',0);



insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (10, "Node with React: Fullstack Web Development", "Build and deploy fullstack web apps with NodeJS, React, Redux, Express, and MongoDB.", 6, 5, "thumbnail", "./public/courses/course-10/ava.jpg",300000, 
"Create boilerplate starter projects with React, Redux, Express, and Mongo
Understand common web technologies and design patterns to connect them together
Master deployment techniques between the production and development environments
Make an app with Google OAuth authentication
", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><em>Note: This course assumes youve got the basics of React and Redux down. &nbsp;Check out my course odern React with Redux, its the perfect preparation!</em></p>
<p>Go beyond the basics of React and Redux! &nbsp;This course will teach you&nbsp;<strong>to combine the ultra-popular React, Redux, Express, and MongoDB technologies to build&nbsp;a fullstack web application.</strong></p>
<p>&nbsp;</p>
<p><strong>Advanced Deployment?</strong>&nbsp;You will learn it. &nbsp;<strong>Billing/Payments</strong><strong>?&nbsp;</strong>Included. &nbsp;<strong>Handling Email</strong><strong>?&nbsp;</strong>Of course!</p>
<p>------------------------------</p>
<p><strong><em>What Will You Build?</em></strong></p>
<p>All of my courses are learn-by-doing: no boring endless lectures with Powerpoints, only live, interactive coding examples.&nbsp;&nbsp;In this course well build&nbsp;<strong>one massive web application</strong>&nbsp;that profiles the&nbsp;<strong>advanced features of React, Redux, Express, and Mongo</strong>. &nbsp;By putting each concept into a real app, youll get a better idea of when to use each&nbsp;unique and powerful feature.</p>
<p><strong>Build a large feedback-collection app.&nbsp;</strong>This mega app will include the full gamut of features, including everything from authentication to email handling. &nbsp;Youll learn how to build an app that can be used to send mass emails to a big list of users for the purpose of collecting feedback. &nbsp;Its my goal to ensure you understand each feature we build into this app so you can apply them to your own personal or professional projects in the future.</p>
<p>------------------------------</p>
<p><strong>Heres what well learn:</strong></p>
<ul>
<li>Learn the architectural considerations of building a full stack app</li>
<li>Connect a front-end&nbsp;<strong>Create-React-App</strong>&nbsp;server to a NodeJS and Express backend</li>
<li>Communicate data from your&nbsp;<strong>Mongo</strong>&nbsp;database to your React application</li>
<li>Understand how to route user requests on the front end with&nbsp;<strong>React Router</strong>&nbsp;and on the backend with Express</li>
<li>Build reusable user inputs with&nbsp;<strong>Redux Form</strong>, complete with navigation</li>
<li>Handle credit cards and receive payments from your users with&nbsp;<strong>Stripe</strong></li>
<li>Engage your users with automated&nbsp;<strong>emails</strong></li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-11', '2021-01-09',0);


insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (11, "Android Java Masterclass - Become an App Developer", "", 5, 5, "thumbnail", "./public/courses/course-11/ava.jpg",800000, 
"Improve your career options by learning Android app Development. Master Android Studio and build your first app today", 
'<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>So, you want to be an Android 7 Nougat programmer? &nbsp;Or you are interested in Android 8 Oreo?</strong></p>
<p>Well, I&rsquo;m Tim Buchalka, one of your instructors, and I&rsquo;ve designed the Android 7 Nougat App and Android 8 Orea&nbsp;Masterclass just for you! &nbsp;Yes one, course covering both version!</p>
<p>Choosing a course that&rsquo;s perfect for you can be damn hard. You need Instructors:</p>
<p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Who are passionate about what they do.</p>
<p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Keep their courses continually updated.</p>
<p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; And most important, provide outstanding support and follow up to your questions.</p>
<p>That&rsquo;s what I do. And that&rsquo;s the reason why I made it into the&nbsp;<strong>Top 10 List of Outstanding Instructors in the 2015 Udemy Instructor Awards</strong>.</p>
<p>Know that you&rsquo;re exactly in the right place to&nbsp;<strong>MASTER</strong>&nbsp;Android 7 Nougat app programming as well as Android 8 Oreo!</p>
<p><strong>Yes, we are in the process right now of&nbsp;updating the entire course to Android Oreo now it has been released by Google!</strong></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>',
 0, 0, '2021-01-11', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (12, "Android O & Java - The Complete Android Development Bootcamp", "", 5, 5, "thumbnail", "./public/courses/course-12/ava.jpg",800000, 
"Learn Android O app development from beginning to end. Learn to code in Java while building fun Android O projects.",
 '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>Sign up today, and here&rsquo;s what you&rsquo;ll get:</strong></p>
<ul>
<li>Over 10 hours of HD 1080p video content</li>
<li>All the knowledge you need to start building any app you can dream of</li>
<li>Thousands of dollars worth of design assets</li>
<li>Our best selling 12 Rules to Learn to Code eBook</li>
<li>The worlds best app development course money can buy</li>
</ul>
<p><strong>From beginner to Android app developer using just one course</strong></p>
<p>By the end of the course youll not just be familiar but completely understand:</p>
<ul>
<li>Concepts of Object Oriented Programming (OOP): The type system, variables, functions and methods, inheritance, classes and protocols.</li>
<li>Control Structures: Using If/&shy;Else clauses, Switch statements and logic to control the flow of execution.</li>
<li>Data Structures: How to work with collections, such as arrays, maps, and ArrayLists.</li>
<li>Software Design: How to organise and format code for readability and how to implement the Model &shy;View&shy; Controller (MVC) design pattern.</li>
<li>Networking: How to make asynchronous API calls, store and retrieve data from the cloud, and use the JSON format for server communication.</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-11', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (13, "The Complete Front-End Web Development Course!", "", 1, 5, "thumbnail", "./public/courses/course-13/ava.jpg",1000000, 
"Get started as a front-end web developer using HTML, CSS, JavaScript, jQuery, and Bootstrap!", 
'<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p>If you would like to get started as a front-end web developer, you are going to LOVE this course! Work on projects ranging from a simple HTML page&nbsp;to a complete JavaScript based Google Chrome extension. We will cover the following technologies in this course:</p>
<ul>
<li>
<p>Web development basics with HTML</p>
</li>
<li>
<p>Cascading Style Sheets (CSS)</p>
</li>
<li>
<p>JavaScript programming</p>
</li>
<li>
<p>jQuery JavaScript library</p>
</li>
<li>
<p>Bootstrap framework</p>
</li>
</ul>
<p>We will work on 3 class projects throughout this course:</p>
<p><strong>Simple text site -&nbsp;</strong>We will use what we learned in the HTML sections to create a simple text site. This project will help you learn HTML structure and the essential elements.</p>
<p><strong>Fallout inspired Pip-Boy -&nbsp;</strong>We will take what we learned in the CSS and Bootstrap sections of the course to code a Pip-Boy from the game Fallout. This project will help you learn the design elements of modern web development.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-11', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (14, "Front End Web Development Bootcamp - Build a Twitter Clone", "", 1, 5, "thumbnail", "./public/courses/course-14/ava.jpg",1200000, 
"Build a Twitter Clone using HTML, CSS, CSS Flexbox, CSS Grid, and JavaScript. Master your Front End Web Developer Skills", 
'<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p>Throughout the course, we are going to build a clone of Twitter. The project will be created based on:</p>
<p><strong>1. HTML</strong></p>
<p><strong>2. CSS</strong></p>
<p><strong>3. CSS Flexbox</strong></p>
<p><strong>4. CSS Grid</strong></p>
<p><strong>5. JavaScript</strong></p>
<p><strong>6. DOM</strong></p>
<p>Before building the project, you will be able to go through the crash courses of all the mentioned technologies. We will start with HTML and CSS. After completing the following sections:</p>
<ul>
<li>
<p>HTML Crash Course</p>
</li>
<li>
<p>CSS Crash Course</p>
</li>
<li>
<p>CSS Flexbox</p>
</li>
<li>
<p>CSS Grid</p>
</li>
</ul>
<p>We will build three different pages of Twitter - Main Page, Login Page and News Feed Page based on HTML and CSS. After that, comes:</p>
<ul>
<li>
<p>JavaScript Crash Course</p>
</li>
<li>
<p>DOM Crash Course</p>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-11', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (15, "Learn and Understand AngularJS", "", 6, 5, "thumbnail", "./public/courses/course-15/ava.jpg",850000, 
"Master AngularJS and the Javascript concepts behind it, design custom directives, and build a single page application.",
 '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p>Knowing AngularJS can get you a job or improve the one you have. Its a skill that will put you more in demand in the modern web development industry, and make your web software life easier, thats why its so popular and backed by Google.</p>
<p>This course will get you up and running quickly, and teach you the core knowledge you need to deeply understand and build AngularJS applications - and well build a single page application along the way<em>.</em></p>
<p>Well design&nbsp;<em><strong>custom services</strong></em><strong>,&nbsp;</strong>build&nbsp;<em><strong>custom directives</strong></em>, understand&nbsp;<strong><em>two-way binding</em></strong>, design a weather forecast app as a&nbsp;<strong><em>single page application</em></strong>, and&nbsp;<strong>lots more</strong>. Both starter and finished source code is provided as we go.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-15', '2021-01-15',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (16, "Modern JavaScript and NodeJS from Beginner to Advanced", "", 7, 5, "thumbnail", "./public/courses/course-16/ava.jpg",740000, 
"Learn JavaScript by building real-world apps and creating a beautiful portfolio of projects!", 
'<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>JavaScript</strong>&nbsp;is one of the&nbsp;<strong>top in demand programming</strong>&nbsp;<strong>languages</strong>&nbsp;and it is climbing to the very&nbsp;top!</p>
<p><strong>Why Learn JavaScript ?</strong></p>
<p>This is a simple to answer, go to google and type in the search bar<strong>&nbsp;"Top 10 programming languages"</strong>&nbsp;if<strong>&nbsp;JavaScript is in the top 5</strong>&nbsp;then take the Course. Not convinced, then go to google and type in the search bar&nbsp;<strong>"The 10 most in-demand programming languages for developers at top companies"&nbsp;</strong>if&nbsp;<strong>JavaScript is in the top 5</strong>&nbsp;then take the Course.</p>
<p>&nbsp;</p>
<p><strong>Who this course is for:</strong></p>
<ul>
<li>
<p>Learning JavaScript for the first time? Already using JavaScript and want to master the language? This course is for you!</p>
</li>
<li>
<p>This course if for anyone who wants to use JavaScript to launch an application, switch careers, or freelance as a JavaScript developer.</p>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-11', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (17, "MERN React Node Next.js Multi User SEO Blogging Platform", "", 7, 5, "thumbnail", "./public/courses/course-17/ava.jpg",300000, 
"Become an Ultimate Web Developer by building a Truly Real World SEO Web App using MERN Stack with React/Next.js for SSR", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>Why we choose React Node NextJs for building SEO Blogging Project</strong></p>
<ul>
<li>
<p>We choose Node React and NextJs because they all&nbsp;<strong>use same programming language</strong>&nbsp;<strong>JavaScript</strong>. So even though its a FullStack app with separate API and separate frontend, we will be dealing with only one language - JavaScript.</p>
</li>
<li>
<p>We choose Node js and Mongo DB for building API because its incredibly&nbsp;<strong>easy</strong>,&nbsp;<strong>flexible</strong>&nbsp;and&nbsp;<strong>easy to scale.</strong></p>
</li>
<li>
<p>We choose&nbsp;<strong>React</strong>&nbsp;because its extremely&nbsp;<strong>powerful</strong>,&nbsp;<strong>performant</strong>&nbsp;and recently became so much fun and easy to use with the introduction of&nbsp;<strong>hooks.</strong></p>
</li>
<li>
<p>We choose&nbsp;<strong>NextJs</strong>&nbsp;because it takes the&nbsp;<strong>development process</strong>&nbsp;of React apps to whole new level.</p>
</li>
<li>
<p><strong>NextJs</strong>&nbsp;comes with&nbsp;<strong>SSR</strong>&nbsp;out of the box and SSR is necessary for SEO</p>
</li>
<li>
<p>NextJs starting with version 9 automatically decides if your web page can be served as a&nbsp;<strong>static page</strong>&nbsp;or<strong>&nbsp;dynamic page.</strong></p>
</li>
<li>
<p>If your page is not making request to backend server to fetch data then NextJs&nbsp;<strong>automatically serves</strong>&nbsp;that page as&nbsp;<strong>static page</strong>.</p>
</li>
<li>
<p>Static pages&nbsp;<strong>load extremely fast</strong>&nbsp;because they are static. there is no need to wait for server response.</p>
</li>
</ul>
<p>&nbsp;</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-11', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (18, "SwiftUI Masterclass 2021 - iOS 14 App Development & Swift 5", "", 4, 5, "thumbnail", "./public/courses/course-18/ava.jpg",740000, 
"The Complete iOS 14 App Development Course with SwiftUI 2 From Beginner to Advanced App Developer with Xcode 12!", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>Important notice&nbsp;before&nbsp;you&nbsp;enroll in&nbsp;this masterclass!</strong></p>
<p>Creating a 50+ hour course with high quality production value takes a lot of time. I dont want to keep you waiting, so I have decided to release the first half of the content before I finish publishing the remaining lectures.</p>
<p>The 2021 edition of this SwiftUI Masterclass course is already more than 20.5+ hours long and it will be much longer by the end of this year.&nbsp;</p>
<p>Each month I release a new exciting and practical project about how to build an iOS 14, a macOS, even a watchOS application from scratch, or other useful learning material about app development in Swift 5.3 programming language.</p>
<p>&nbsp;</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-11', '2021-01-09',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (19, "The Complete React Developer Course (w/ Hooks and Redux)", "", 6, 5, "thumbnail", "./public/courses/course-19/ava.jpg",850000, 
"Learn how to build and launch React web applications using React, Redux, Webpack, React-Router, and more!", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p><strong>This course was just&nbsp;updated to support React v16, React Hooks, the Context API, and more!</strong></p>
<p><strong>--</strong></p>
<p><strong>Have you tried to learn React before?</strong></p>
<p>It&rsquo;s easy to go down the rabbit hole of libraries and tools only to come out of it not knowing how to build and launch a real-world React application. You get things configured, but you&rsquo;re not sure how the libraries fit together (or if you&rsquo;re even using the right one).</p>
<p>Sound familiar?</p>
<p><strong>I built this course to show you how you can build and launch real-world React web applications.</strong></p>
<p>The Complete React Web Developer Course 2 starts with the fundamentals and covers everything you&rsquo;ll need to build and launch React web apps.</p>
<p>You&rsquo;ll see what it takes to build and launch a React app, from the first line of code to the final production deployment.</p>
<p>This course was designed around one goal: turning you into a professional React developer capable of developing, testing, and deploying real-world production applications.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-14', '2021-01-14',0);

insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate, isDisabled)
values (20, "GraphQL with React: The Complete Developers Guide", "", 6, 5, "thumbnail", "./public/courses/course-20/ava.jpg",650000, 
"Learn and master GraphQL by building real web apps with React and Node", '<div class="course-landing-page__main-content component-margin">
<div class="clp-component-render">
<div class="clp-component-render">
<div class="udlite-text-sm  styles--description--3y4KY" data-purpose="course-description">
<div class="show-more--container--1QLmn">
<div class="show-more--content--isg5c show-more--with-gradient--2abmN">
<div data-purpose="safely-set-inner-html:description:description">
<div class="top-container dark-background">
<div class="dark-background-inner-position-container">
<div class="">
<div class="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
<div class="clp-component-render">
<div class="topic-menu udlite-breadcrumb">
<p>If you are new to GraphQL, or if youve been working to learn it but sometimes feel like you still , this is the GraphQL course for you! To learn GraphQL you have to understand it.</p>
<ul>
<li>Learn how to use GraphQLs schema to define relations between your data objects</li>
<li>Learn the process of combining a backend server with a front end React</li>
<li>Master the process of thinking about your applications data in terms of a graph structure</li>
<li>Grasp the difference between GraphQL, Apollo, and Relay, and when to use each</li>
<li>Develop apps that are unique, fun, and responsive.</li>
<li>Build servers that can be used with both React and React Native applications</li>
<li>Master handling authentication with GraphQL</li>
<li>Learn the core principles of navigation with React Router and GraphQL</li>
</ul>
<p>Ive built the course that I would have wanted to take when I was learning GraphQL. A course that explains the concepts and how theyre implemented in the best order for you to learn and deeply understand them.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>', 0, 0, '2021-01-01', '2021-01-01',0);



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
