const { populate } = require('../models/post');
const Post=require('../models/post');
const User=require('../models/user');
const Likes=require('../models/like');

module.exports.home=async function(req,res){
    try{
        let posts=await Post.find({})
        .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'likes',
            model:'Likes'
        },
        populate:{
            path:'user',
            model:'User'
        }
    })
    .populate('likes');
    let user=await User.find({});
        return res.render('home',{
            title:'Codeial | Home',
            posts:posts,
            all_users:user
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}

        
 