const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

// Setup body parser and session
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

// MongoDB User schema (for login data tracking)
const userSchema = new mongoose.Schema({
    email: String,
    loginCount: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email (authentication logic can go here)
    const user = await User.findOne({ email });

    if (user) {
        // If user exists, increment login count
        user.loginCount += 1;
        await user.save();

        // Store user info in session
        req.session.user = user;
        return res.json({ message: 'Login successful', loginCount: user.loginCount });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Admin route to get login count data
app.get('/admin/logins', async (req, res) => {
    const users = await User.find({});
    res.json(users); // List of all users with login count
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
