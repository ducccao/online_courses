SELECT * from mysql.user

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
flush privileges;

select * from users
select * from orders
select * from orderdetails
select * from sessions
select * from course
select * from subjects
select * from unit 
select* from chapter

select userName from users as us, course as c where us.userID = c.userID

select * from chapter
select * from unit
select * from category
select* from course where catID = 1

update users
set verify = 2
where userID  = 6


update course 
set 


select * from orders as od ,orderdetails as dt where userID = od.userID and od.orderID = dt.orderID


select * from coursebought

select * from coursebought where userID = 


select * from course order by 


insert into course (courseID , courseName, title , catID, userID , thumbnail , avatar , fee, subDescription, fullDescription, isFinished , views, dayPost , lastUpdate)
values (12, "PHP for Beginners - Become a PHP Master - CMS Project", "PHP for Beginners: learn everything you need to become a professional PHP developer with practical exercises & projects.", 3,5, "thumbnail", "avata",500000, "You will learn to create a (CMS) Content Management System like WordPress, Drupal or Joomla
You will learn how to use Databases
You will learn MySQL
Object Oriented Programming
You will learn how to launch your application online
How to use forms to submit data to databases", "One of the biggest PHP Courses in UDEMY ........
Best Rated PHP course on UDEMY......
Over 90,000 Students taking this course already.........
BEST Reviewed PHP beginners course for a reason.....", 0, 0, '2021-01-05', '2021-01-09');


{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"isAuth":true,"searchContentListCourse":"","retUrl":"http://localhost:3000/","authUser":{"userID":7,"userName":"admin","email":"admin@gmail.com","password":"admin123","DOB":"1999-12-11T17:00:00.000Z","decentralization":2,"verify":1,"OTP_URL":""},"cart":[{"id":1,"quantity":1},{"id":2,"quantity":1},{"id":3,"quantity":1}]}