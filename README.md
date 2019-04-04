# node-mysql-rest-api
> Simple Node.js Boilerplate for simple Node.js Applications. Inspired by [septa97's node-boilerplate](https://github.com/septa97/node-boilerplate), [Kunal Kapadia's express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api), and [brianschardt's node_rest_api_mysql](https://github.com/brianschardt/node_rest_api_mysql)

A boilerplate for building applications in Node.js using ES6 with Code Coverage. Follows [Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript).

## Features

| Feature                                                                                               |
|-------------------------------------------------------------------------------------------------------|
| ES6 using [Babel](https://babeljs.io/)                                                                |
| Run tests using [Mocha](https://mochajs.org/)                                                         |
| Code linting using [ESLint](http://eslint.org/)                                                       |
| Automatic syntax formatting using [prettier](https://github.com/prettier/prettier)                    |
| Auto-restart server using [nodemon](https://nodemon.io/)                                              |
| Logging using [debug](https://github.com/visionmedia/debug)                                           |
| HTTP access control using [cors](https://github.com/expressjs/cors)                                   |
| API parameter validation using [express-validation](https://github.com/andrewkeig/express-validation) |
| Code coverage using [istanbul](https://istanbul.js.org/)                                              |
| HTTP status code and message [http-status](https://github.com/adaltas/node-http-status)               |
| Consistent commit syntax using [commitizen](http://commitizen.github.io/cz-cli/) and [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)  |
| Precommit hook by running the linter and code coverage tool                                           |
| Authentication using [Passport.js](http://passportjs.org/) and [JSON Web Tokens](https://jwt.io/)     |
| Password hashing using [bcryptjs](https://www.npmjs.com/package/bcryptjs)                             |

## Installing / Getting started

Clone the repository and name it as you like.

```shell
git clone https://github.com/JoemaNequinto/node-mysql-rest-api.git <your-project-name>
cd your-project-name/
rm -rf .git/ && git init
git remote add origin https://github.com/<USERNAME>/<REPOSITORY>.git
npm run --silent create
cp .env.example .env
rm README.md
mv README.sample.md README.md
npm install
```

Then fill up the prompt for modifying the package.json.

You must delete the .git folder and re-initialize it using `git init`.

You must also create a new README.md. Open the new README.md then modify it depending on your project.

The above code installs the dependencies, creates an environment file, and modifies the package.json file.

## MySQL create database

Simple script to create MySQL database and user.

```shell
cd scripts/
sudo chmod 755 mysql-db-create.sh
sudo ./mysql-db-create.sh <dbname> <dbuser> <password>
```

You must enter the password of MySQL root user.

You must change the values of DB_NAME, DB_USER, DB_PASSWORD in .env with dbname, dbuser, password

The above code creates a MySQL database, user and password; modifies the .env file.

## Developing the application

To start developing with code linter,

```shell
npm run dev
```

## Making a commit

To safely follow the standards of a commit,

```shell
npm run cm
```

then follow the instructions.

## Tests

To run tests,

```shell
npm run test
```
