const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access-log',{
    interval:'1d',
    path:logDirectory
})


const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'kanavdahat@gmail.com',
            pass: 'gmvrzjybdxoiuvky' // generated ethereal password
        }
    },
    google_client_id:"360099346166-rerpjriet7923cbj3pj14hm5vk2k3egs.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options:{
            stream:accessLogStream
        }
    }
}

const production={
    name:process.env.CODEIAL_DB,
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:process.env.CODEIAL_SERVICE,
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.CODEIAL_AUTH_USER,
            pass:process.env.CODEIAL_AUTH_PASS  // generated ethereal password
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{
            stream:accessLogStream
        }
    }
}

module.exports=eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);