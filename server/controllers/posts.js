import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const newPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { title, message, creator, selectedFile, tags } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with entered ID");
  const updatedPostData = {
    creator,
    title,
    message,
    tags,
    selectedFile,
    _id: id,
  };
  try {
    await PostMessage.findByIdAndUpdate(
      id,
      { ...updatedPostData, id },
      { new: true, useFindAndModify: false }
    );
    res.json(updatedPostData);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with entered ID");
  try {
    await PostMessage.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
    const { id } = req.params
    try {
        await PostMessage.updateOne({_id : id}, { $inc: { likeCount :1}})
    } catch (error) {
        console.log(error)
    }

}
