const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Express app setup
const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/hackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema;
const User = require('../models/User'); // Adjust path as per your project structure
const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});





// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle login request
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }); // Query based on username only
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        // Verify password (example, adjust as per your password hashing method)
        if (user.password !== password) {
            return res.status(401).send('Invalid username or password');
        }

        // Password matches, proceed with login
        // Example: Set session or JWT token for authentication
        // Example: res.cookie('token', authToken);

        // Redirect to the App.js page or send success response
        res.redirect('/App');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Handle signup request
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Dashboard route
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Handle period data submission
app.post('/log-period', async (req, res) => {
    const { username, startDate, endDate } = req.body;
    try {
        const cycleLength = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        const ovulationDate = new Date(new Date(startDate).getTime() + (cycleLength / 2) * (1000 * 60 * 60 * 24));
        const fertileWindow = [
            new Date(ovulationDate.getTime() - 3 * (1000 * 60 * 60 * 24)),
            new Date(ovulationDate.getTime() + 3 * (1000 * 60 * 60 * 24))
        ];

        // Get or create a collection for the user based on username
        const Period = getPeriodModel(username);
        
        const newPeriod = new Period({
            userId: mongoose.Types.ObjectId(), // You might want to generate this dynamically
            startDate,
            endDate,
            cycleLength,
            ovulationDate,
            fertileWindow
        });
        await newPeriod.save();
        res.redirect('/home');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Handle symptom logging
app.post('/log-symptom', async (req, res) => {
    const { username, date, physical, emotional, intensity } = req.body;
    try {
        // Get or create a collection for the user based on username
        const Period = getPeriodModel(username);

        const period = await Period.findOne({ username }).sort({ startDate: -1 }).exec();
        period.symptoms.push({ date, physical, emotional, intensity });
        await period.save();
        res.redirect('/home');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Serve dashboard (das.html)
app.get('/das', async (req, res) => {
    try {
        const username = req.query.username; // Assuming you pass username as a query parameter
        const Period = getPeriodModel(username);

        // Fetch user and latest period data
        const user = await User.findOne({ username });
        const latestPeriod = await Period.findOne({ username }).sort({ startDate: -1 }).exec();

        // Prepare data to send to das.html
        const data = {
            username: user.username,
            cycleLength: latestPeriod.cycleLength,
            nextPeriod: latestPeriod.endDate, // You should adjust this based on your prediction logic
            symptoms: latestPeriod.symptoms
        };

        // Render das.html and pass data
        res.render('das', { data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
