const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
      await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash('success', 'Post Published!');
    return res.redirect("back");
  } catch (err) {
    req.flash('error', err);
    console.log(err);
    return res.redirect('back');
  }
};

// delete a post 

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.user.toString() === req.user.id) {
       post.deleteOne();

      // Delete comments associated with the post
      await Comment.deleteMany({ post: req.params.id });
      req.flash('success', 'Post and associated comments are deleted');
      return res.redirect('back');
    } else {
      req.flash('error', 'You can not delete this post');
      return res.status(403).send("You're not authorized to delete this post");
    }
  } catch (err) {
    req.flash('error', err.message);
    console.error(err);
    return res.status(500).send({error: err.message});
  }
};