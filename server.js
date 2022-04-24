const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const passportSetup = require('./config/passport');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

//init session
app.use(session({ secret: "String for encrypting cookies.",
                  name: "Cookie_name",
                  cookie: {maxAge:7 * 24 * 3600 * 1000},
                  proxy: true,
                  resave: true,
                  saveUninitialized: true
                }));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth', require('./routes/auth.routes.js'))
app.use('/user', require('./routes/user.routes.js'))

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

/*
// configure passport provider options
passport.use(new GoogleStrategy({
    clientID: '741392366630-mc3nbqf7h7t2n0t21tekrabvqipmqiak.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/auth/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
}); */
