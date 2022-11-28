const User=require("../models/user");

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log("error");
        }
        return res.render('user_profile',{title:"User Profile",profile_user:user});
    });
    
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
                req.flash('success','New User Signed Up!');
                return res.redirect('/users/sign-in');

            });
        }else{
            return res.redirect('back');
        }
    })


}

module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.signOut=function(req,res){
    req.logout(function(err){
        if(err){
            console.log("error");
        }
    });
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}

module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('error',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    user.avatar=User.avatarPath +'/'+ req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
            
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}