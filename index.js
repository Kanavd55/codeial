const express=require('express');
const cookieParser=require('cookie-Parser');
const port=8000;
const app=express();
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const expressLayouts=require('express-ejs-layouts');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:true,
    outputStyle:"expanded",
    prefix:"/css"
}));


app.use(expressLayouts);
app.use(express.urlencoded());
app.use(express.static("./assets"));
app.use('/uploads',express.static(__dirname +'/uploads'));
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
    },
    store:MongoStore.create({
        mongoUrl:"mongodb://localhost/codeial_development",
        autoRemove:"diabled"
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
})