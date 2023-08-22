const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');

// create comment  of a post
module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();
      
      const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name email') // Populate the 'user' field with 'name' and 'email' from the referenced User model
      .exec();                       //  used to execute a query
      req.flash('success', 'Comment published');
      commentsMailer.newComment(populatedComment);

      res.redirect('/');
    } else {
      console.log("Post not found");
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};


// delete comment from post
module.exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    if (comment.user == req.user.id) {
      const postId = comment.post;
      await comment.deleteOne();

      // Update the post to remove the comment from the comments array. the $pull by mongoose will pull out the comment from posts.
      await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
      req.flash('success', 'Deleted')
      return res.redirect('back');
    } else {
      return res.status(403).send("You're not authorized to delete this comment");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};