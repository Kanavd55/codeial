const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');

module.exports.create=async function(req,res){
    try{
    let post=await Post.findById(req.body.post);
    if(post){
        let comment=await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email');
            commentsMailer.newComment(comment);
    

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },message:"Comment Created"
                });
            }

            req.flash('success','Comment Created!');
            res.redirect('/');
        }
    }catch(err){
        req.flash('error',err);
        return;
    }
}


module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            console.log("error");
            return;
        }
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                if(err){
                    console.log('error');
                    return;
                }
                req.flash('success','Comment Deleted!');
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}