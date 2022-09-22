const express=require('express');
const cookieParser=require('cookie-Parser');
const port=8000;
const app=express();

const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/',require('./routes'));

const db=require('./config/mongoose');

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
})