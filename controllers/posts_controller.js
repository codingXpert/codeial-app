const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
      await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return;
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
      return res.redirect('back');
    } else {
      return res.status(403).send("You're not authorized to delete this post");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({error: err.message});
  }
};