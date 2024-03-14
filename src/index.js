const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("./config");

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('images'));

app.get('/', (req, res) => {
    res.render('login');
});

//signup
app.post('/signup', async (req, res) => {
    const user = new User(req.body);

    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    //check if user exists
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
        res.send('<script>alert("User already exists");</script>');
    } else {
        try {
            await User.insertMany(user);
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    }
});

//login
app.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.send('<h1>user not found</h1>');
        } else {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                res.send('<h1>Welcome ' + user.username + '</h1>');
            } else {
                res.send('<script>alert("Wrong password");</script>');
            }
        }
    }
    catch (err) {
        console.log(err);
    }

})


mongoose
    .connect('')//add mongodb url here
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`)
        })
    }).catch(err => {
        console.log(err)
    });