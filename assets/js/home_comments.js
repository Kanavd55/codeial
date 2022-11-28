{
    let createComment=function(){
        let newCommentForm=$('#post-comments');
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comments/create',
                success:function(data){
                    let newComment=newCommentDom(data.data.comment);
                    $('#posts-list-container>ul').prepend(newPost);
                },error:function(e){
                    console.log(error.responseText);
                }
            })
        })
    }

    newCommentDom=function(comment){
        return $(`<li>
            <p>
                ${comment.content} 
                <br>
                <small>
                    ${comment.user.name} 
                </small><br>
                    <a href="/comments/destroy/${ comment._id}">Delete</a>
            </p>
        </li>`)
    }

    createComment();
}