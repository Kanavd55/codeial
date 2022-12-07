 {
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
               
        ${post.content} 
        <br>
        <small>
            ${post.user.name}
        </small>
        <br>
        <small>
            <a class="toggle-like-button" id="toggle-like-button" data-likes="${post.likes.length}" 
                href="/likes/toggle/?id=${post._id}&type=Post">${post.likes.length} Likes
            </a>
    </small>
    <br>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
        <div id="post-comments-form" class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Your Comment..">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
            <div id="post-comments-${post._id}" class="post-comments-list">
                <ul>
                </ul>
            </div>
        </div>
    </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
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


    createPost();
 }