// Entry point
import express from 'express';
import path from 'path';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

const port = process.env.PORT || 8000;
import posts from './routes/posts.js';

const app = express();

// Body parser middleware
app.use(express.json()); // take care of json data
app.use(express.urlencoded({extended: false})); // xwww formurl

// logger middleware
app.use(logger);

// static pages - middleware
//app.use(express.static(path.join(__dirname, 'public'))); // render html pages

// Routes middleware
app.use('/api/posts', posts)

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

// listen port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})
