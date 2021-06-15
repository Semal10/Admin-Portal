# Welcome to Admin Portal

Simple application for Admin in a University to manually choose courses for
students. 

# Features

* Signup - Login - Logout Authentication
* Portal contains the list of all students (accessible to admins only)
* Admins can add/remove courses for a particular student
* Students can signup to the Portals but have no access to use the portal's features
* Server-Side Pagination API + Pagination UI/UX
* Mobile Responsive
* Role Based Authentication & Authorization API
* Dockerized (Dockerfile & Docker Compose)


# Technologies Used

* FrontEnd : ReactJS 
* BackEnd : NodeJS, ExpressJS 
* Database : MongoDB
* Version Control : Git
* Environment : Linux, Docker
* API Testing : Postman Service
* Password Hashing : Bcrypt
* API Authentication : JWT, Cookies, PassportJS

## Installation & Usage

**Via Docker**

*  Install with [`docker`](https://docs.docker.com/engine/install/ubuntu/) & [`docker-compose`](https://docs.docker.com/compose/install/) 
    + `$ docker-compose build`
    + `$ docker-compose up`

**Via Package Manager**

*  Install with [`node`](https://nodejs.org/en/download/) & run following commands on both client and server directory
    + `$ npm install`
    + `$ npm start`

## Credentials

*  Admin (Can access portal dashboard, see the list of all students, modify their data)
    + `Email : admin@gmail.com`
    + `Password : admin`
    
*  User (Cannot access portal dashboard, Unauthorized to see the list of all students & modify)
    + `Email : user@gmail.com`
    + `Password : user`    
    

## Live Demo

[Admin Portal](https://admin-portal-semal.herokuapp.com/)

