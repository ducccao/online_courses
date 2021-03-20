***
# Web application development course - Project - OnlineCourses
***
## Features list

### I. Anonymous user module

**1. Home page**
+ Three most outstanding courses in the past week
+ Ten most viewed courses (in all fields)
+ Ten latest courses (in all fields)
+ Five categories were most signed up in the past week

**2. Two-level course menu system**
+ Displays list of categories and their child (sub-category)


**3. Search course / View courses list**
+ Allows searching by many criteria (name, category)
+ Pagination
+ Sorted search result
+ The display of those courses which are outstanding, new, discounted is different from those which are typically normal
+ Full text search


**4. Course details**
+ Full description of the course, lecture information, list of lectures, rating and feedback of learners about the  course
+ Full-format course description
+ Watch video clips of lectures right in the application


**5. Sign in**

**6. Sign up**
+ Using `bcrypt` for hashing password
+ Validate Email
+ Valid email confirmation by OTP

### II. Student user module
**1. Save 1 course to favorites (Watch list)**

**2. Course buying**

**3. Update personal information (email, name, password)**

**4. Favorite course management (Satch list)**
+ Allows to quickly open the course detail's view from this list
+ Remove the course from watch list

**5. View the list of courses that you are bought**
+ Allows to quickly open the course detail's view from this list
+ The display of those courses which are incomplete is different from the rest

**6. See the detailed course content**

**7. Comment, rating, and feedback on the course**


### III. Instructor user module
**1. Upload a course**
+ Use the WYSIWYG Editor for the course information
+ Upload lecture videos

**2. Adding information & lectures for the course**

**3. Update the profile, this information is shown on the course details screen**

**4. View the list of uploaded courses**

### IV. Administrator module (Admin)
**1. View student's records**

**2. View instructor's records**

**3. Lock student & teacher accounts**

**4. Category management (CRUD)**

**5. Course management**
+ View course's records, allow to filter by category or instructor
+ Course disabling, disabled courses won't show up in search results


**6. Grant an account for the lecturer**

***
## Tech
**Backend (Core)**
1. Server
+ `NodeJS`
+ `Express`
+ `Handlebars`
2. Database
+ `MySQL`

**Frontend (No UX/UI Design)**
+ `Javascript`

***
## More description
**Production**

- Hosting server: `Heroku`
- Hosting database: `https://remotemysql.com/`
- Domain: https://onlineecoursee.herokuapp.com/

**Testing**
- Testing result in the development environment: 100%
- Testing result in the production environment: 30% (Because of lack of authority to use the database)

***
# Thank you !






