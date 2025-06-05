// Entry point
import express from 'express';
import auths from './sign_up_in.js';
import profiles from './profiles.js';
import pins from './pins.js';
import logger from './middleware/logger.js';

const port = process.env.PORT || 3000;

const app = express();

/* --------------- middleware ----------------- */
// Body parser
app.use(express.json()); // take care of json data
app.use(express.urlencoded({extended: false})); // xwww formurl

// Logger
app.use(logger);

/* --------------- Paths ----------------- */
// Sign up/in
app.use('/api/auths', auths);

// Profiles
app.use('/api/profiles', profiles);

// Pins
app.use('/api/pins', pins);

// listen port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})
