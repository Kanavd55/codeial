const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID:"360099346166-rerpjriet7923cbj3pj14hm5vk2k3egs.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            return console.log('error',err);
        }
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    return console.log('error',err);
                }
                return done(null,user);
            })
        }
    })
}
));

module.exports=passport;