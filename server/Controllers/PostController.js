import PostModel from '../Model/PostModel.js'
import UserModel from "../Model/userModel.js"
import mongoose from 'mongoose';



// create new post
export const createPost=async(req,res)=>{
    const newPost=new PostModel(req.body)
    try {
        const post=await newPost.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get a post

export const getPost=async(req,res)=>{
    const id=req.params.id;

    try {
      const newPost=await PostModel.findById(id)
    newPost? res.status(200).json(newPost):
    res.status(404).json("newPost no post")
    } catch (error) {
        res.status(500).json(error) 
    }
}
// update a post

export const updatePost=async(req,res)=>{
    const postId=req.params.id;
    const{userId}=req.body
 
     try {
     const post=  await PostModel.findById(postId) 
    if(post.userid===userId){
    await PostModel.updateOne({$set:req.body})
        res.status(200).json("post Updated")
    }else{
        res.status(403).json("Action Forbidden")  
    }

    } catch (error) {
        res.status(404).json(error)
    }
}

// delete a post

    export const deletePost=async(req,res)=>{
const id=req.params.id;
const {userid}=req.body;
try {
 const post= await PostModel.findById(id)
 if(post.userId===userid){
    await PostModel.deleteOne()
    res.status(200).json("post deleted")
 }else{
    res.status(403).json("Action Forbidden")
 }
} catch (error) {
    res.status(500).json(error)
}
    }

 // like and dislike a post

    export const likePost=async(req,res)=>{
const id=req.params.id;
const{userId}=req.body;
try {
    
    const post=await PostModel.findById(id)
if(!post.likes.includes(userId))
{
await post.updateOne({$push:{likes:userId}})
res.status(200).json('post liked')
}else{
    await post.updateOne({$pull:{likes:userId}})
    res.status(200).json('post unliked')  
}


} catch (error) {
    res.status(500).json(error)
}
    }

// get timeline posts
    export const timelinePost = async (req, res) => {
        const userId = req.params.id
        try {
          const currentUserPosts = await PostModel.find({ userId: userId });
      
          const followingPosts = await UserModel.aggregate([
            { 
              $match: {
                _id: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $lookup: {
                from: "posts",
                localField: "following",
                foreignField: "userId",
                as: "followingPosts",
              },
            },
            {
              $project: {
                followingPosts: 1,
                _id: 0,
              },
            },
          ]);
      
          res.status(200).json(
            currentUserPosts
              .concat(...followingPosts[0].followingPosts)
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
          );
        } catch (error) {
          res.status(500).json(error);
        }
      };