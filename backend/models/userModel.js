import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
   
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: [true,'please add an email'],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Enter Valid Email",
          ],
    },
    password: {
        type: String,
        required:true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false
    },
    phoneNo: {
        type:String,
        required: true,
        default: "Enter your phone Number",
      
    }



}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (password) {

    return await bcrypt.compare(password,this.password)
    
}


userSchema.pre('save', async function (next) { 
   
    // means agar edit karty waqt password modifie ni horha ho to next run krky middleware se bhr nikal jao 

    if (!this.isModified('password')) {
        next()
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})
const User = mongoose.model('User', userSchema);

export default User;