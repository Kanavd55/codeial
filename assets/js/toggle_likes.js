{
    let toggleLike=function(){
        let newLike=$('.toggle-like-button');
        newLike.click(function(e){
            e.preventDefault();
            let LikeElement=$(this);
            //console.log(LikeElement.attr('href'));

            $.ajax({
                type:'post',
                url:LikeElement.attr('href'),
                data: LikeElement.serialize(),
                success: function(data){
                    let likesCount = parseInt(LikeElement.attr('data-likes'));
                    //console.log(likesCount);
                    if (data.data.deleted == true){
                        likesCount -= 1;
                    
                    }else{
                        likesCount += 1;
                    }
                    LikeElement.attr('data-likes', likesCount);
                    LikeElement.html(`${likesCount} Likes`);

                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    toggleLike();
}