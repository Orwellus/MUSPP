const session = require("express-session");
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: '408089314629-in25ga0tvqdglgv88lhfljfk719ssuch.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3005/auth/google/callback' // Replace with your callback URL,
  }, (accessToken, refreshToken, profile, done) => {
    // You can access the authenticated user's profile here
    // Use the 'done' callback to proceed with your application logic
    // For example, you can save the user to a database or create a session
    done(null, profile);
   // console.log(accessToken, refreshToken,profile);
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });