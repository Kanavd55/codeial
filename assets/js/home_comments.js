{
    // method to submit the form data for new post using AJAX
    let createComment=function(){
        let newCommentForm=$('.post-comments-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
            let comment=$(this);
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:comment.serialize(),
                success:function(data){
                    console.log(data);
                    let newComment=newCommentDom(data.data.comment);
                    $(`#post-comments-${data.data.comment.post}>ul`).prepend(newComment);
                    deleteComment($(' .delete-comment-button',newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // method to create a comment in DOM
    newCommentDom=function(comment){
        return $(`<li id="comment-${comment._id}">
            <p>
                ${comment.content} 
                <br>
                <small>
                    ${comment.user.name} 
                </small><br>
                <small>
                    <a class="toggle-like-button" data-likes="${comment.likes.length}"  id="toggle-like-button"
                        href="/likes/toggle/?id=${comment._id}&type=Comment">${comment.likes.length} Likes
                    </a>
                </small>
                &ensp;
                <a class="delete-comment-button" href="/comments/destroy/${ comment._id}">Delete</a>
            </p>
        </li>`)
    }

    //method to delete a comment from DOM
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data.data);
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createComment();
}