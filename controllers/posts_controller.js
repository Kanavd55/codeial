const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating a post');
            return
        }
        return res.redirect('back');
    })
}

module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
    if(post.user==req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
    }
    
    }catch(err){
        console.log("Error",err);
    }
}
