{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form'); // id of the form

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),  // converts the data into json formate
                success: function(data){
                   console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            }).done(function(res) {
                $tbl.find("tbody").append(res);
            }).fail(function(x, a, e) {
                alert(e);
            });
        });
    }
    // method to create a post in DOM
    createPost();
}