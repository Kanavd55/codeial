const Post=require('../../../models/post');
const User=require('../../../models/user');
module.exports.index=async function(req,res){
    try{
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    let user=await User.find({});
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}
    catch(err){
        console.log('Error',err);
        return res.json(401,{
            message:"error"
        });
    }
}




module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            return res.json(200,{
                message:'Post and associated comments deleted'
            });
        }else{
            res.json(401,{
                message:'You cannot delete this post'
            });
        }
    }catch(err){
        console.log('Error')
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}