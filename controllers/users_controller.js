module.exports.profile=function(req,res){
    res.end('<h1>User Profiler</h1>');
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{title:"Sign-In"});
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{title:"Sign-In"});
}

module.exports.create=function(req,res){

}

module.exports.createSession=function(req,res){
    
}