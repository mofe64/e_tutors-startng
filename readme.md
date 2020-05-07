E-tutors Documentation.
All Routes with the exception of the signup and login routes are protected and can only be accessed when logged in.

API LINK : https://etutors-start.herokuapp.com

Admin Log-in details
email:ogunbiyioladapo33@gmail.com
password:test1234

Signing up
There are two routes for signing up

1. https://etutors-start.herokuapp.com/api/v1/user/tutor/signup which is to sign up as a tutor.
2. https://etutors-start.herokuapp.com/api/v1/user/student/signup which is to sign up as a student.

when signing-up the following fields must be provided:

1. firstname : test
2. lastname : testlastname
3. email : test@example.io
4. password : test1234
5. passwordconfirm : test12345

upon signing up a jwt token is issued and sent along in the response. This token must be prefixed with Bearer and sent alongside every request in an Authorization header eg
if token : 12356789abc
"Authorization" : "Bearer 12356789abc"

Signing-in
All users both tutors and students can log in via the same route :
https://etutors-start.herokuapp.com/api/v1/user/login

when logging in, the following fields must be provided:

1. email:test@example.io
2. password: test1234

upon a successful login, a jwt token is issued and sent alongside the response. This token must be prefixed with Bearer and sent alongside every request in an Authorization header eg
if token : 12356789abc
"Authorization" : "Bearer 12356789abc"

CREATING A CATEGORY
You can create a category by making a Post Request to https://etutors-start.herokuapp.com/api/v1/category/newcategory
This will add a new category the categories collection. The request also allows for a user to add subject to the catgeory by adding the subject Id to the subjects field which accepts an array of Id's eg:
"category": "testCategory"
"subjects":["subjectId1", "subjectId2", "subjectId3"] }
Note: this route is restricted to admins only.

GET ALL CATEGORIES
You can get all categories by maing a Get Request to https://etutors-start.herokuapp.com/api/v1/category/all
This will get all categories that currently exist in the categories collection.
This route is not restricted to any role, however as stated earlier you must be logged in to access this route.

GET A CATEGORY
You can get a specific category from the categories collection by making Get Request to https://etutors-start.herokuapp.com/api/v1/category/ and adding the categoryId to the route eg:
https://etutors-start.herokuapp.com/api/v1/category/<categoryId>
This will get the category whose Id was added to the route.

CREATING A SUBJECT UNDER A CATEGORY
You can add a subject to a category by making a Post Request to https://etutors-start.herokuapp.com/api/v1/category/<categoryId>/subject
The category id must be provided in the request URI as seen in the route above.
The subject field must be present in the req.body eg:
"subject": "Maths"
This action is restricted to admins alone.

UPDATING A SUBJECT IN A CATEGEORY
You can update a subject in a category by making a patch request to :
https://etutors-start.herokuapp.com/api/v1/category/<categoryId>/subject/<subjectId>
The subjectfield must be present in the req.body eg:
"subject":"Maths2"
This action is restricted to admins alone

DELETING A SUBJECT IN A CATEGORY
You can delete a subject in category my making a delete request to :
https://etutors-start.herokuapp.com/api/v1/category/<categoryId>/subject/<subjectId>
This will delete the subject whose Id was in the URI.
This action is restricted to admins alone.

GET ALL TUTORS
You can get all tutors registered by making a get request to :
https://etutors-start.herokuapp.com/api/user/all/tutors
This route is restricted to admins only.

GET A TUTOR
You can get a specific tutor from the tutors collection, by making a Get Request to
https://etutors-start.herokuapp.com/api/v1/user/tutors/<tutorId>
This route is restricted to admins only

DEACTIVATE A TUTOR
You can deactivate a tutor by making a delete request to :
https://etutors-start.herokuapp.com/api/v1/user/tutors/<tutorId>
the tutor id must be added to the URI as seen in the example above.

LESSONS

CREATE A LESSON (BOOK A LESSON)
You can create a lesson by making a Post request to : https://etutors-start.herokuapp.com/api/v1/lesson/addlesson
the lessonname must be provided in the req.body
you can also provide the Id's of the tutors who will be handling the lesson in the the tutors field, which accepts an array of Id's.
you can also provide the Id of the subject to which the lesson belongs to in the subject field, which accepts an Id.
It is also possible to provide the Id's of the student's which will belong to the course in the student's field which accepts an array of Id's
This route is limited to admins only.

Eg :
"lessonname":"The Reproductive System",
"tutors": ["5eb0837613f4e069a057ac02", "5eb0838413f4e069a057ac03"],
"subject": "5eb081e113f4e069a057abfe",
"students": []

GET ALL LESSONS
You can get all lessons in the Lessons collection by making a Get Request to: https://etutors-start.herokuapp.com/api/v1/lesson
This route is limited to admins only.

GET A LESSON.
You can get a specific lesson from the lessons collection by manking a Get Request to:  
https://etutors-start.herokuapp.com/api/v1/lesson<lessonId>
The lessonId must be provided in the URI
This route is limited to admins only.

UPDATE A LESSON
You can update a specific lesson by making Patch Request to
https://etutors-start.herokuapp.com/api/v1/lesson<lessonId>
The lessonId must be provided in the URI
This route is limited to admins only.

DELETE LESSON
You can delete a lesson from the lessons category by making a Delete Request to
https://etutors-start.herokuapp.com/api/v1/lesson<lessonId>
The lessonId must be provided in the URI
This route is limited to admins only.

A Tutor Perform the following actions.

Register TO TAKE A SUBJECT IN A CATEGORY
A tutor can register to take a subject by making a Patch Request to :
https://etutors-start.herokuapp.com/api/subject/<subjectId>/addtutor<tutorId>
The subjectId must be present in the URI as well as the tutor Id as seen in the URI above
This route is limited to Tutors only.

GET ALL SUBJECTS A TUTOR HAS REGISTERED FOR
A tutor can get all the subjects he has registered for by making a get request to :
https://etutors-start.herokuapp.com/api/v1/user/tutors/<tutorId>/subjects
This route is limited to tutors only.

UPDATE A REGISTERED SUBJECT
A tutor can update a subject he has registered for, by making
