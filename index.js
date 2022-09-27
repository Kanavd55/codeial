const express=require('express');
const cookieParser=require('cookie-Parser');
const port=8000;
const app=express();
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());



const db=require('./config/mongoose');

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:"codeial",
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
})