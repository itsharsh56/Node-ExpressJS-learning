Copy the following content into `README.md` in your project root:

```markdown
# NodeKB

NodeKB is a learning project for building a knowledge-base web application with Node.js, Express, MongoDB, Mongoose, Passport.js, Pug, and Bootstrap.

The application allows users to:

- Register an account
- Log in and log out
- Create articles
- View articles
- Edit their own articles
- Delete their own articles
- Use session-based authentication
- Display success and error messages

> This project is intended for learning purposes. Some parts may require additional improvements before being used in production.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Learning Goals](#learning-goals)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Application Flow](#application-flow)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Available Routes](#available-routes)
- [Authentication Flow](#authentication-flow)
- [Database Models](#database-models)
- [Middleware](#middleware)
- [Pug Templates](#pug-templates)
- [Static Files](#static-files)
- [ES Module Configuration](#es-module-configuration)
- [Form Validation](#form-validation)
- [Common Errors and Solutions](#common-errors-and-solutions)
- [Security Notes](#security-notes)
- [Possible Improvements](#possible-improvements)
- [Useful Commands](#useful-commands)
- [Learning Resources](#learning-resources)
- [License](#license)

---

## Project Overview

NodeKB is a server-rendered Express application.

The backend is responsible for:

- Handling HTTP requests
- Rendering Pug templates
- Connecting to MongoDB
- Managing users
- Authenticating users
- Creating and managing articles
- Serving CSS and other static files

The frontend is generated using Pug templates. MongoDB stores users and articles. Passport.js manages login sessions.

---

## Learning Goals

This project demonstrates the following concepts:

1. Creating a Node.js application
2. Using Express to create a web server
3. Organizing an Express application into routes and middleware
4. Using ES modules in Node.js
5. Connecting Node.js to MongoDB with Mongoose
6. Creating Mongoose schemas and models
7. Hashing passwords with bcrypt
8. Authenticating users with Passport.js
9. Using sessions to keep users logged in
10. Rendering dynamic pages with Pug
11. Validating form input with express-validator
12. Serving static files with Express
13. Using environment variables with dotenv
14. Handling errors in Express
15. Protecting routes with authentication middleware

---

## Technologies Used

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](https://www.passportjs.org/)
- [passport-local](https://www.passportjs.org/packages/passport-local/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

### Frontend

- [Pug](https://pugjs.org/)
- Bootstrap-compatible CSS classes
- Custom CSS

### Middleware and Utilities

- express-session
- connect-flash
- express-messages
- express-validator
- dotenv

---

## Project Structure

```text
Nodekb/
│
├── app.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── README.md
│
├── config/
│   └── database.js
│
├── middleware/
│   └── passport.js
│
├── models/
│   ├── article.js
│   └── user.js
│
├── routes/
│   ├── articles.js
│   └── users.js
│
├── public/
│   └── css/
│       └── style.css
│
└── views/
    ├── add.pug
    ├── article.pug
    ├── edit_article.pug
    ├── index.pug
    ├── layout.pug
    ├── login.pug
    ├── message.pug
    └── register.pug
```

### Root Files

#### `app.js`

The main application file.

It is responsible for:

- Loading environment variables
- Creating the Express application
- Configuring the view engine
- Configuring sessions
- Configuring Passport
- Registering middleware
- Registering routes
- Connecting to MongoDB
- Starting the HTTP server

#### `package.json`

Contains:

- Project metadata
- Dependencies
- npm scripts
- ES module configuration

The project uses:

```json
"type": "module"
```

This means JavaScript files use `import` and `export` syntax.

#### `.env`

Stores private configuration values such as:

- MongoDB connection string
- Session secret

This file should not be committed to Git.

#### `README.md`

Project documentation and setup instructions.

---

## Application Flow

A typical request follows this flow:

```text
Browser
   |
   v
Express server
   |
   v
Middleware
   |
   +--> Session middleware
   +--> Passport middleware
   +--> Flash messages
   +--> Body parsing
   |
   v
Route handler
   |
   v
Mongoose model
   |
   v
MongoDB
   |
   v
Pug template
   |
   v
HTML response
```

For example, when a user visits the homepage:

1. The browser sends a request to `/`.
2. Express receives the request.
3. Session and Passport middleware run.
4. The application queries MongoDB for articles.
5. The articles are passed to the `index.pug` template.
6. Pug generates HTML.
7. Express sends the HTML to the browser.

---

## Prerequisites

Before running the project, install the following:

- Node.js 18 or newer
- npm
- MongoDB Atlas account or local MongoDB installation
- Git, if you want to clone the project

Check your installed versions:

```powershell
node --version
npm --version
```

Recommended Node.js version:

```text
Node.js 20 or newer
```

---

## Installation

### 1. Open the project directory

```powershell
cd "D:\coding\Web_Development\Node and Express\Nodekb"
```

### 2. Install dependencies

```powershell
npm install
```

This installs the dependencies listed in `package.json`.

### 3. Create the environment file

Create a file named:

```text
.env
```

Place it in the project root, next to `package.json`.

### 4. Configure MongoDB

Add your MongoDB connection string to `.env`.

Example:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@your-cluster.mongodb.net/nodekb?retryWrites=true&w=majority
SESSION_SECRET=replace_this_with_a_long_random_secret
```

Replace:

- `USERNAME` with your MongoDB username
- `PASSWORD` with your MongoDB password
- `your-cluster.mongodb.net` with your MongoDB cluster address

### 5. Start the application

```powershell
npm start
```

The application should be available at:

```text
http://localhost:3000
```

---

## Environment Variables

The application uses environment variables to keep configuration separate from source code.

### `MONGODB_URI`

The MongoDB connection string.

Example:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/nodekb
```

### `SESSION_SECRET`

A secret used to sign session cookies.

Example:

```env
SESSION_SECRET=use-a-long-random-value-here
```

A stronger example can be generated with Node.js:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> Do not use the example session secret in a real application.

### Recommended `.gitignore`

Create a `.gitignore` file containing:

```gitignore
node_modules/
.env
npm-debug.log*
```

Never commit passwords, MongoDB credentials, or session secrets.

---

## Running the Application

Start the application:

```powershell
npm start
```

Open the application in a browser:

```text
http://localhost:3000
```

Stop the server by pressing:

```text
Ctrl + C
```

---

## Available Routes

### Public Routes

| Method | URL | Description |
|---|---|---|
| `GET` | `/` | Display all articles |
| `GET` | `/users/register` | Display registration form |
| `POST` | `/users/register` | Create a new user |
| `GET` | `/users/login` | Display login form |
| `POST` | `/users/login` | Authenticate a user |
| `GET` | `/articles/:id` | Display one article |

### Authenticated Routes

| Method | URL | Description |
|---|---|---|
| `GET` | `/articles/add` | Display the add article form |
| `POST` | `/articles/add` | Create a new article |
| `GET` | `/articles/edit/:id` | Display the edit form |
| `POST` | `/articles/edit/:id` | Update an article |
| `DELETE` | `/articles/:id` | Delete an article |
| `GET` | `/users/logout` | Log out the current user |

The exact route behavior depends on the implementation in the route files.

---

## Authentication Flow

The project uses Passport.js with the local authentication strategy.

### Registration

When a user registers:

1. The form sends data to `/users/register`.
2. The input is validated.
3. The password is hashed using bcrypt.
4. The new user is saved to MongoDB.
5. The user is redirected to the login page.

Passwords should never be stored as plain text.

Example password hashing:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

### Login

When a user logs in:

1. The form sends the username and password to `/users/login`.
2. Passport searches for the username.
3. bcrypt compares the submitted password with the stored hash.
4. Passport creates a login session if the password is correct.
5. The user is redirected to the homepage.

### Logout

When a user logs out:

1. Passport removes the user from the session.
2. A flash message is created.
3. The user is redirected to the login page.

### Protected Routes

Protected routes use an authentication helper:

```js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('danger', 'Please log in');
  return res.redirect('/users/login');
}
```

This prevents unauthenticated users from accessing protected pages.

---

## Database Models

### User Model

The user model stores account information.

Typical fields include:

```js
{
  name: String,
  email: String,
  username: String,
  password: String
}
```

The password should contain a bcrypt hash rather than the original password.

Recommended user model rules:

- `name` is required
- `email` is required
- `username` is required
- `email` should be unique
- `username` should be unique
- `password` is required

### Article Model

The article model stores knowledge-base articles.

Typical fields include:

```js
{
  title: String,
  author: ObjectId,
  body: String
}
```

The `author` field should reference the user who created the article:

```js
author: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
```

This creates a relationship between the `Article` and `User` collections.

---

## Middleware

Middleware functions execute during the request and response cycle.

### Body Parsing

```js
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
```

These allow Express to read:

- HTML form data
- JSON request bodies

### Static Files

```js
app.use(express.static(path.join(__dirname, 'public')));
```

This makes files inside the `public` directory available to the browser.

For example:

```text
public/css/style.css
```

Can be accessed using:

```text
/css/style.css
```

### Sessions

```js
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
```

Sessions allow the application to remember logged-in users between requests.

### Flash Messages

```js
app.use(flash());
```

Flash messages are temporary messages shown to users after an action.

Examples:

- Registration successful
- Login failed
- Article created
- Article updated
- User logged out

### Passport

Passport requires two middleware functions:

```js
app.use(passport.initialize());
app.use(passport.session());
```

The first initializes Passport. The second connects Passport to the session system.

---

## Pug Templates

Pug is the template engine used by this project.

### Layout Template

The `views/layout.pug` file provides the common page structure:

- HTML document
- Navigation bar
- CSS imports
- Flash messages
- Main content block
- Footer
- JavaScript imports

Other templates extend the layout:

```pug
extends layout

block content
  h1 Page title
```

### Homepage

The homepage template is:

```text
views/index.pug
```

It displays the list of articles.

Example:

```pug
each article in articles
  li
    a(href="/articles/" + article._id)= article.title
```

### Add Article Page

The add article template is:

```text
views/add.pug
```

The route should render it using:

```js
res.render('add');
```

If the route uses:

```js
res.render('add_article');
```

then Express will look for:

```text
views/add_article.pug
```

That file must either exist or the route must be changed to render `add`.

### Error Messages

Templates can display validation errors:

```pug
if errors
  each error in errors
    div.alert.alert-danger= error.msg
```

---

## ES Module Configuration

This project uses ES modules because `package.json` contains:

```json
"type": "module"
```

Use:

```js
import express from 'express';
export default router;
```

Do not use CommonJS syntax:

```js
const express = require('express');
module.exports = router;
```

### File Extensions

When importing local files in ES modules, include the `.js` extension:

```js
import { User } from '../models/user.js';
```

Use:

```js
import articleRoutes from './routes/articles.js';
```

Not:

```js
import articleRoutes from './routes/articles';
```

### `__dirname` in ES Modules

Node.js does not automatically provide `__dirname` when using ES modules.

Use this code:

```js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

This allows the application to create absolute paths for:

- Views
- Public files
- Other project directories

---

## Form Validation

The project uses `express-validator`.

Modern validation uses:

```js
import { body, validationResult } from 'express-validator';
```

Example:

```js
router.post(
  '/register',
  [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must contain at least 6 characters')
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('register', {
        errors: errors.array()
      });
    }

    // Continue with registration
  }
);
```

Older methods such as these should not be used with modern `express-validator`:

```js
req.checkBody();
req.validationErrors();
```

---

## Common Errors and Solutions

### `ReferenceError: __dirname is not defined`

#### Cause

The project is running as an ES module.

#### Solution

Define `__dirname` manually:

```js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

---

### `ReferenceError: require is not defined`

#### Cause

The project uses ES modules, but the code uses CommonJS `require()`.

#### Incorrect

```js
const mongoose = require('mongoose');
```

#### Correct

```js
import mongoose from 'mongoose';
```

---

### `ERR_MODULE_NOT_FOUND`

#### Cause

A local ES module import is missing the `.js` extension.

#### Incorrect

```js
import { User } from '../models/user';
```

#### Correct

```js
import { User } from '../models/user.js';
```

---

### `connectDB is not defined`

#### Cause

The database connection function is used without being imported.

#### Solution

```js
import connectDB from './config/database.js';
```

---

### `MONGODB_URI is not defined`

#### Cause

The `.env` file is missing, incorrectly named, or not loaded.

#### Checklist

1. Confirm that the file is named `.env`.
2. Confirm that it is in the project root.
3. Confirm that the variable is named `MONGODB_URI`.
4. Load environment variables before using them:

```js
import 'dotenv/config';
```

5. Restart the server after changing `.env`.

---

### `Failed to connect to MongoDB`

Check the following:

- MongoDB is running or MongoDB Atlas is available.
- The connection string is correct.
- The database user and password are correct.
- Your IP address is allowed in MongoDB Atlas.
- Special characters in the password are URL-encoded.
- The connection string starts with `mongodb+srv://` for Atlas.

---

### `Failed to lookup view`

#### Cause

The name passed to `res.render()` does not match the template filename.

For example:

```js
res.render('add_article');
```

Requires:

```text
views/add_article.pug
```

If the file is named:

```text
views/add.pug
```

Use:

```js
res.render('add');
```

---

### `req.checkBody is not a function`

#### Cause

The project uses an old validation API.

#### Solution

Use `body()` and `validationResult()` from `express-validator`.

---

### `req.logout is not a function` or logout callback error

For Passport 0.7 and newer, use a callback:

```js
req.logout((error) => {
  if (error) {
    return next(error);
  }

  res.redirect('/');
});
```

---

### `Cannot read properties of null`

#### Cause

A database query did not find a document, but the code tried to access a property on `null`.

#### Unsafe

```js
const article = await Article.findById(req.params.id);
console.log(article.title);
```

#### Safer

```js
const article = await Article.findById(req.params.id);

if (!article) {
  return res.status(404).send('Article not found');
}

console.log(article.title);
```

---

### Port already in use

If port `3000` is already being used:

```text
Error: listen EADDRINUSE: address already in use
```

Stop the existing process or change the application port:

```js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

Then add this to `.env` if required:

```env
PORT=3001
```

---

## Security Notes

This is a learning project, but these security practices should be followed.

### Never Commit Secrets

Do not commit:

- MongoDB passwords
- Session secrets
- API keys
- Private certificates
- Production credentials

Add `.env` to `.gitignore`.

### Hash Passwords

Never store passwords directly:

```js
password: req.body.password
```

Always hash them:

```js
const hashedPassword = await bcrypt.hash(req.body.password, 10);
```

### Validate User Input

Validate all form input before saving it to the database.

Validation should be applied to:

- Names
- Email addresses
- Usernames
- Passwords
- Article titles
- Article bodies
- Route parameters

### Protect Article Ownership

Users should only be able to edit or delete their own articles.

Before updating or deleting an article:

1. Find the article.
2. Confirm that it exists.
3. Confirm that the current user owns it.
4. Perform the requested action.

### Use a Production Session Store

The default Express session store is intended for development.

For production, use a session store such as:

- connect-mongo
- Redis
- Another supported session store

### Use HTTPS in Production

Production applications should use HTTPS to protect:

- Login credentials
- Session cookies
- User data

---

## Possible Improvements

The following improvements can be added as future learning exercises.

### Application Improvements

- Add article search
- Add article categories
- Add article tags
- Add pagination
- Add article creation dates
- Add article update dates
- Add user profile pages
- Add a dashboard
- Add article drafts
- Add a rich text editor
- Add Markdown support
- Add image uploads
- Add comments
- Add article likes
- Add related articles

### Authentication Improvements

- Add password reset
- Add email verification
- Add account lockout after failed attempts
- Add rate limiting
- Add “Remember me”
- Add role-based access control
- Add an administrator role
- Add two-factor authentication

### Security Improvements

- Add Helmet
- Add CSRF protection
- Add request rate limiting
- Add stronger password rules
- Add secure cookie settings
- Add input sanitization
- Add centralized logging
- Add production error pages

### Database Improvements

- Add indexes
- Add database pagination
- Add schema validation
- Add reusable query helpers
- Add soft deletion
- Add database migration strategy

### Code Quality Improvements

- Add ESLint
- Add Prettier
- Add automated tests
- Add API tests
- Add integration tests
- Add environment-specific configuration
- Add a dedicated controller layer
- Add a service layer
- Add a centralized error class

---

## Suggested Future Folder Structure

As the application grows, the project can be organized into controllers and services:

```text
Nodekb/
├── app.js
├── package.json
├── .env
│
├── config/
│   ├── database.js
│   └── passport.js
│
├── controllers/
│   ├── articleController.js
│   └── userController.js
│
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
│
├── models/
│   ├── article.js
│   └── user.js
│
├── routes/
│   ├── articles.js
│   └── users.js
│
├── services/
│   ├── articleService.js
│   └── userService.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── layouts/
│   ├── articles/
│   └── users/
│
└── tests/
    ├── articles.test.js
    └── users.test.js
```

The current structure is suitable for learning. The expanded structure is useful when the project becomes larger.

---

## Useful Commands

Install dependencies:

```powershell
npm install
```

Start the application:

```powershell
npm start
```

Install a new dependency:

```powershell
npm install package-name
```

Install a development dependency:

```powershell
npm install --save-dev package-name
```

Check installed packages:

```powershell
npm list --depth=0
```

Check for outdated packages:

```powershell
npm outdated
```

Remove the `node_modules` directory manually and reinstall dependencies if needed:

```powershell
npm install
```

Check the Node.js version:

```powershell
node --version
```

Check the npm version:

```powershell
npm --version
```

---

## Basic Development Workflow

A typical development workflow is:

1. Start MongoDB or confirm that MongoDB Atlas is available.
2. Confirm that `.env` is configured.
3. Install dependencies with `npm install`.
4. Start the server with `npm start`.
5. Open `http://localhost:3000`.
6. Test registration.
7. Test login.
8. Create an article.
9. Edit the article.
10. Delete the article.
11. Check the terminal for errors.
12. Stop the server with `Ctrl + C`.

---

## Testing Checklist

Use this checklist while developing:

### Server

- [ ] The server starts without errors.
- [ ] MongoDB connects successfully.
- [ ] The homepage loads.
- [ ] Static CSS files load.
- [ ] Pug templates render correctly.

### Registration

- [ ] Empty fields are rejected.
- [ ] Invalid email addresses are rejected.
- [ ] Password confirmation is checked.
- [ ] Passwords are hashed.
- [ ] Duplicate usernames are rejected.
- [ ] Duplicate emails are rejected.

### Login

- [ ] Correct credentials allow login.
- [ ] Incorrect credentials are rejected.
- [ ] The user remains logged in between requests.
- [ ] Flash messages are displayed.

### Articles

- [ ] Articles can be created by authenticated users.
- [ ] Articles appear on the homepage.
- [ ] An individual article can be viewed.
- [ ] Only the owner can edit an article.
- [ ] Only the owner can delete an article.
- [ ] Missing article IDs return a suitable response.

### Logout

- [ ] The user can log out.
- [ ] Protected pages are inaccessible after logout.
- [ ] The user is redirected to the login page.

---

## Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Passport.js Documentation](https://www.passportjs.org/docs/)
- [Pug Documentation](https://pugjs.org/api/getting-started.html)
- [Express Validator Documentation](https://express-validator.github.io/docs/)
- [bcrypt npm Package](https://www.npmjs.com/package/bcrypt)
- [Express Session npm Package](https://www.npmjs.com/package/express-session)

---

## License

This project is intended for educational purposes only.

The project currently uses the ISC license as specified in `package.json`.

```text
ISC License
```

---

## Author

Created by Harsh as a Node.js and Express learning project.
```