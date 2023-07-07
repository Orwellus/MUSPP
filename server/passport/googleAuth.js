
const passport = require('passport');
authUser = (request, accessToken, refreshToken, profile, done) => {
  userProfile=profile
  return done(null, userProfile);
}
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: '408089314629-in25ga0tvqdglgv88lhfljfk719ssuch.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3005/auth/google/callback',
    passReqToCallback   : true
  }, authUser));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });