import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

import { User } from '../models/user.js';

const router = Router();

// Display the registration form
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register'
  });
});

// Process registration form data
router.post(
  '/register',

  // Validate the submitted registration fields
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),

    body('email')
      .trim()
      .isEmail()
      .withMessage('A valid email is required'),

    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must contain at least 6 characters'),

    body('password2')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match')
  ],

  async (req, res, next) => {
    // Collect validation errors created by express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('register', {
        title: 'Register',
        errors: errors.array()
      });
    }

    try {
      // Check whether the username is already registered
      const existingUsername = await User.findOne({
        username: req.body.username
      });

      if (existingUsername) {
        return res.status(409).render('register', {
          title: 'Register',
          errors: [{ msg: 'Username is already registered' }]
        });
      }

      // Check whether the email is already registered
      const existingEmail = await User.findOne({
        email: req.body.email
      });

      if (existingEmail) {
        return res.status(409).render('register', {
          title: 'Register',
          errors: [{ msg: 'Email is already registered' }]
        });
      }

      // Hash the password before saving it to MongoDB
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
      });

      req.flash('success', 'You are now registered and can log in');
      return res.redirect('/users/login');
    } catch (error) {
      next(error);
    }
  }
);

// Display the login form
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

// Authenticate the user with Passport
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
);

// Log out the current user
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.flash('success', 'You are logged out');
    return res.redirect('/users/login');
  });
});

export default router;