E-tutors Documentation.
All Routes with the exception of the signup and login routes are protected and can only be accessed when logged in.

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

upon signing up a jwt token is issued and sent along in the response. This token must be prefixed with Bearer sent alongside every request in an Authorization header eg
token : 12356789abc
"Authortization" : "Bearer 12356789abc"

Signing-in
All users both tutors and students can log in via the same route :
https://etutors-start.herokuapp.com/api/v1/user/login

when logging in, the following field must be provided:

1. email:test@example.io
2. password: test1234
