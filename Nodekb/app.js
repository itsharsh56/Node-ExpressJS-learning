// Load environment variables from the .env file
import 'dotenv/config';

// Import Express and required Node.js modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import middleware packages
import session from 'express-session';
import flash from 'connect-flash';
import messages from 'express-messages';
import passport from 'passport';

// Import application configuration, models, and routes
import connectDB from './config/database.js';
import configurePassport from './middleware/passport.js';
import { Article } from './models/article.js';
import articleRoutes from './routes/articles.js';
import userRoutes from './routes/users.js';

// __dirname is not available automatically in ES modules.
// These lines recreate __dirname for an ES module project.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express application
const app = express();

// Tell Express where the Pug templates are located
app.set('views', path.join(__dirname, 'views'));

// Tell Express to use Pug as the template engine
app.set('view engine', 'pug');

// Parse HTML form data
app.use(express.urlencoded({ extended: false }));

// Parse JSON request data
app.use(express.json());

// Serve static files such as CSS, JavaScript, and images
app.use(express.static(path.join(__dirname, 'public')));

// Configure sessions so users can remain logged in
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Enable flash messages for temporary success and error messages
app.use(flash());

// Configure Passport authentication strategies
configurePassport(passport);

// Initialize Passport
app.use(passport.initialize());

// Enable login session support for Passport
app.use(passport.session());

// Make flash messages available inside Pug templates
app.use((req, res, next) => {
  res.locals.messages = messages(req, res);
  next();
});

// Make the currently logged-in user available inside every Pug template
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Home page route
// Retrieves all articles from MongoDB and displays them on the homepage
app.get('/', async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.render('index', {
      title: 'Articles',
      articles
    });
  } catch (error) {
    next(error);
  }
});

// Register route files
app.use('/articles', articleRoutes);
app.use('/users', userRoutes);

// Central error-handling middleware
// Any error passed to next(error) will be handled here
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Something went wrong');
});

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  }
};


// Start the application
startServer();