import POST from "../Model/postSchema.js";
import cloudinary from "../database/config.js";
import User from "../Model/userSchema.js";

export const newPost = async (req, res) => {
  const { title, description } = req.body;
  const file = req.files.image.tempFilePath;
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: "posts",
    });

    const post = await POST.create({
      title,
      description,
      postedBy: req.user._id,
      image: { url: result.secure_url, public_id: result.public_id },
    });

  const user = await User.findById(req.user._id);
  user.posts.push(post._id);
  await user.save();
    const save = await post.save();

    if (save) {
      return res.status(200).json({
        success: false,
        message: "New post save successfully in  darabase",

      });
    }

  } catch (error) {

  }

};

// get all post

export const getAllPost = async (req, res) => {
  const post = await POST.find();
  if (post) {
    return res.status(200).json({
      success: true,
      message: "All post  fetched",
      data: post,
    });
  }
};

// get single post from databse
export const getSinglePost = async (req, res) => {
  const { id } = req.params;

  const post = await POST.findById({ id });

  if (!post) {
    return res.status(402).json({
      success: false,
      message: "Post not found  in databse",
    });
  }

  return res.status(200).json({
    success: true,
    message: "single post fetched",
    data: post,
  });
};

// Delete Post
export const deletePost = async (req, res, next) => {

  const post = await POST.findById(req.params.id);

  if (!post) {
      return res.status(401).json({
        success:false,
        message:'Post not found'
      })
  }

  if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success:false,
        message:"Unauthorized"
      });
  }

  const user = await User.findById(req.user._id);

  const index = user.posts.indexOf(req.params.id);
  user.posts.splice(index, 1);
  await user.save();

  res.status(200).json({
      success: true,
      message: "Post Deleted"
  });
};


export const myProfile=async()=>{

}

// Like or Unlike Post
export const likeUnlikePost =async (req, res, next) => {
console.log('like process...')
  const post = await POST.findById(req.params.id);

  if (!post) {
      return res.status(400).json({
        success:false,
        message:'Post not found'
      })
  }

  if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);
      await post.save();

      return res.status(200).json({
          success: true,
          message: "Post Unliked"
      });
  } else {
      post.likes.push(req.user._id)

      await post.save();

      return res.status(200).json({
          success: true,
          message: "Post Liked"
      });
  }
};
// Add Comment
export const newComment = async (req, res, next) => {

  const post = await POST.findById(req.params.id);

  // if (!post) {
  //     // return next(new ErrorHandler("Post Not Found", 404));
  // }

  // if (post.comments.includes(req.user._id)) {
  //     // return next(new ErrorHandler("Already Commented", 500));
  // }

  post.comments.push({
      user: req.user._id,
      comment: req.body.comment
  });

  await post.save();

  return res.status(200).json({
      success: true,
      message: "Comment Added"
  });
};
