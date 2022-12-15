const mongoose=require('mongoose');
const friendshipSchema=new mongoose.Schema({
    //the user who sent this request
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Friendship=new mongoose.model('Friendship',friendshipSchema);
module.exports=Friendship;