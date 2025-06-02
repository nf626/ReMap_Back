// Entry point
import express from 'express';
import auths from './sign_up_in.js';
import profiles from './profiles.js';

const port = process.env.PORT || 3000;

const app = express();

// Body parser middleware
app.use(express.json()); // take care of json data
app.use(express.urlencoded({extended: false})); // xwww formurl

// Sign up/in
app.use('/api/auth', auths);

// Profiles
app.use('/api/profile', profiles);

// listen port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})
