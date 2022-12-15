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
    jwt_secret:'codeial'
}

const production={
    name:'production'
}

module.exports=development;