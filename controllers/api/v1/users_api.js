const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment');

module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:'Invalid Username or Password'
            });
        }
        return res.json(200,{
            message:'Sign In successful',
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,
                {expiresIn:'1000000'})
            }
        });
    }catch(err){
        console.log('Error');
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}