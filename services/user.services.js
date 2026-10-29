const User = require("../models/user.model")
const UserProfile=require('../models/user.profile.model')
const tokenService = require('../jwt/token.service')
const bcrypt = require('bcrypt')
const mongoose=require('mongoose')
class UserServices {
    async signup(name, email, password) {
        const exist = await User.findOne({ email })
        if (exist) {
            throw new Error('User is already exist')
        }
        const hashedpass = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedpass })
        return user
    }
    async loginUser(email, password) {
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            throw new Error("invalid credentials");
        }
        if(!user.isActive)
        {
            throw new Error('user is inactive')
        }
        const payload = {
            id: user._id,
            email: user.email,
            isActive: user.isActive,
        }
        const token = tokenService.generateToken(payload)
        const uwp = user.toObject()
        delete uwp.password
        return { user: uwp, token }
    }
    async getAllUsers(){
        const user=await User.find({isActive:true})
        // .populate('profile')
        const userIds=user.map((user)=>user._id)
        const userProfiles=await UserProfile.find({
            user:{$in:userIds},
        })

        const userWithprofiles=user.map((user)=>{
            const profile=userProfiles.find(
                (profile)=>profile.user.toString()===user._id.toString()
            )
            return{
                ...user.toObject(),
                profile:profile||null,
            }
        })
        return userWithprofiles
    }
    async softDeleteUser(id) {
        const user = await User.findById(id)
        if (!user) {
            throw new Error("User not found")
        }
        user.isActive = false
        await user.save()
        return user
    }

    async update(id, name) {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not Found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { name },
        { new: true}
    );

    return updatedUser;
}

async addUserProfile(userId,profiledata){
    if(!mongoose.isValidObjectId(userId))
    {
        throw new Error("invalid user id")
    }
    const user=await User.findById(userId)
    if(!user)
    {
        throw new Error("user not found")
    }
    const userProfile=await UserProfile.create({
        user:userId,
        age:profiledata.age,
        dob:profiledata.dob,
        bio:profiledata.bio,
    })
    user.profile=userProfile._id;
    await user.save()
    return userProfile

}


}
module.exports = new UserServices()