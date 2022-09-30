const User=require("../models/user");

module.exports.profile=function(req,res){
    return res.render('profile',{title:"Profile Page"});
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{title:"Sign-In"});
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{title:"Sign-Up"});
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.render('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user");
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("error in finding user");
                    return;
                }
                return res.redirect('/users/sign-in');

            });
        }else{
            return res.redirect('back');
        }
    })


}

module.exports.createSession=function(req,res){
    return res.render('user-home',{title:"user-home"});
}

module.exports.signOut=function(req,res){
    req.logout(function(err){
        if(err){
            console.log("error");
        }
    });
    return res.redirect('/');
}