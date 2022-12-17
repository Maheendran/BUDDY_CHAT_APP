import UserModel from "../Model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// get all user

export const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};


// get a user

export const getUser=async(req,res)=>{
const id=req.params.id
try {
    const user=await UserModel.findById(id)
    if(user){
        const {password,...otherdetails}=user._doc
        res.status(200).json(otherdetails)
    }
    else{
        res.status(404).json("No such user exist") 
    }
} catch (error) {
   res.status(500).json(error) 
}

}

// gupdate user

export const updateUser=async(req,res)=>{
    const id=req.params.id
    const{_id,currentUserAdmin,password}=req.body
   
        if(id===_id|| currentUserAdmin){
            try {
                if(password){
                    const salt=await bcrypt.genSalt(10)
                    req.body.password=await bcrypt.hash(password,salt)
                }
                const user=await UserModel.findByIdAndUpdate(id,req.body,{new:true})  
                const token = jwt.sign(
                  { username: user.username, id: user._id },
                 "MERN",
                  { expiresIn: "1h" }
                );
                res.status(200).json(user)
                
            } catch (error) {
                res.status(500).json(error)
            }
           
        }
  else{
      res.status(403).json("access Denied!")
 }
    
    }

    // delete user

    export const deletUser=async(req,res)=>{
const id=req.params.id;
const{currentUserById,currentUserAdminStatus}=req.body
if(id===currentUserById|| currentUserAdminStatus){
try {
   await UserModel.findByIdAndDelete(id)
res.status(200).json("user deleted successfully")
} catch (error) {
    res.status(403).json("only delet your on own profile")
}
}
    }

    // follow user

    // export const followUser = async (req, res) => {
    //     const id = req.params.id;
    //     const { _id } = req.body;
   
    //     if (_id === id) {
    //       res.status(403).json("Action Forbidden");
    //     }
    //      else {
    //       try {
    //         const followUser = await UserModel.findById(id);
    //         const followingUser = await UserModel.findById(_id);
      
    //         if (!followUser.followers.includes(id)) {
    //           await followUser.updateOne({ $push: { followers: _id } });
    //           await followingUser.updateOne({ $push: { following: id } });
    //           res.status(200).json("User followed!");
    //         } 
    //         else {
    //           res.status(403).json("you are already following this id");
    //         }
    //       } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error);
    //       }
    //     }
    //   };
    export const followUser = async (req, res) => {
      const id = req.params.id;
      const { _id } = req.body;
      console.log(id, _id)
      if (_id == id) {
        res.status(403).json("Action Forbidden");
      } else {
        try {
          const followUser = await UserModel.findById(id);
          const followingUser = await UserModel.findById(_id);
    
          if (!followUser.followers.includes(_id)) {
            await followUser.updateOne({ $push: { followers: _id } });
            await followingUser.updateOne({ $push: { following: id } });
            res.status(200).json("User followed!");
          } else {
            res.status(403).json("you are already following this id");
          }
        } catch (error) {
          console.log(error)
          res.status(500).json(error);
        }
      }
    };
      // unfollow user

    export const unfollowUser = async (req, res) => {
      const id = req.params.id;
      const { _id } = req.body;
 
      if (_id === id) {
        res.status(403).json("Action Forbidden");
      }
       else {
        try {
          const followUser = await UserModel.findById(id);
          const followingUser = await UserModel.findById(_id);
    
          if (followUser.followers.includes(id)) {
            await followUser.updateOne({ $pull: { followers: id } });
            await followingUser.updateOne({ $pull: { following: _id } });
          
            res.status(200).json("User unfollowed!");
          } else {
            res.status(403).json("you are already unfollowing this id");
          }
        } catch (error) {
          console.log(error)
          res.status(500).json(error);
        }
      }
    };
      