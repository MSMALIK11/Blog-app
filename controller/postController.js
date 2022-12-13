import POST from "../Model/postSchema.js";
export const newPost = async (req, res) => {
  console.log("rinning ....");
  const { title, description } = req.body;

  if (title == "" && description == "") {
    return res.status(401).json({
      success: false,
      message: "All filds are required",
    });
  }
  //   check post alredy exist or not

  const isExist = await POST.findOne({ title });
  console.log("exist-status", isExist);
  // if (isExist) {
  //   return res.status(4001).json({
  //     succes: false,
  //     message: "title Already exist",
  //   });
  // }

  const post = await POST.create({
    title,
    description,
  });
  const save = await post.save();

  if (save) {
    return res.status(200).json({
      success: false,
      message: "New post save successfully in  darabase",
    });
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

// delet post from database by id
export const deletePost = async () => {
  const { id } = res.params;

  const isExist = await POST.findById({ id });

  if (exist) {
  }
};
