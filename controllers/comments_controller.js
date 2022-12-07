const Comment=require('../models/comment');
const Post=require('../models/post');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
const commentsMailer=require('../mailers/comments_mailer');
const Like=require('../models/like');

module.exports.create=async function(req,res){
   try{
    let post=await Post.findById(req.body.post);
    if(post){
        let comment=await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });
            post.comments.unshift(comment);
            post.save();
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },message:"Comment Created"
                });
            }
            
            let necomment = await comment.populate('user', 'name email');
            //commentsMailer.newComment(comment);
            let job=queue.create('emails',necomment).save(
                function(err){
                    if(err){
                        console.log('error in sending to a queue');
                        return;
                    }
                    console.log(job.id);
                }
            );


            

            
            req.flash('success','Comment Created!');
            res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return;
    }
}


module.exports.destroy=async function(req,res){
    let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId= comment.post;
            comment.remove();
            let post=Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            await Like.deleteMany({likeable:req.params.id,onModel:'Comments'});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"comment deleted"
                });
            }
            req.flash('success','Comment Deleted!');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    };
