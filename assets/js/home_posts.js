    // Fetch user data when the page loads
    $.ajax({
        type: 'post',
        url: '/posts/create', // Adjust the URL to match your backend API
        success: function(userData) {
        window.userData = userData;
        createPost(); // Proceed to create post after fetching user data
        },
        error: function(error) {
            console.log(error.responseText);
        }
    });

    // Method to submit the form data for a new post using AJAX
    function createPost() {
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
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // Method to create a post in DOM
    function newPostDom(post){
        // Access user data from the stored object
        const userName = window.userData.name;

        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${ post.id }">X</a>
                        </small>
                        ${ post.content }
                        <br>
                        <small>
                        ${ userName } <!-- Use the fetched user name -->
                        </small>
                    </p>
                    <!-- Rest of your code ... -->
                </li>`);
    }
