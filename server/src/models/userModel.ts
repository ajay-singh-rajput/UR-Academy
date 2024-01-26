import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
userType:'student' | 'teacher' | 'admin' ;
firstName:string;
lastName:string;
contact:string;
city:string;
gender:'male' | 'female' | 'other';
email:string;
password:string;
verifyCode:string;
isVerified:boolean;
resetPasswordToken:number;
avatar:{
    fileId:string;
    url:string;
};

comparePassword(password:string):boolean;
getJWTToken():string;
}

const userModel:Schema<IUser> = new mongoose.Schema({
    userType:{
        type:String,
        enum:['student','teacher','admin']
    },
    firstName:{
        type:String,
        require:[true, 'First name is require'],
        minLength:[3,'First name should have 3 characters'],
        maxLength:[6, 'First name not exceed more then 6 character']
    },
    lastName:{
        type:String,
        require:[true, 'First name is require'],
        minLength:[3,'First name should have 3 characters'],
        maxLength:[6, 'First name not exceed more then 6 character']
    },
    contact:{
        type:String,
        unique:true,
        require:[true, 'contact is require'],
        minLength:[10,'contact should have 10 characters'],
        maxLength:[10, 'contact not exceed more then 10 character']
    },
    city:{
        type:String,
        require:[true,'City name is required'],
    },
    gender:{
        type:String,
        enum:['male','female','other']
    },
    email:{
        type:String,
        unique:true,
        require:[true, 'Email is required'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        select:false,
        maxLength:[15, 'Password should not exceed more than 15 characters'],
        minLength:[6, 'Password should not exceed more than 15 characters'],
        // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
    },
    resetPasswordToken:{
        type:Number,
        default:0
    },
    avatar:{
        type:Object,
        default:{
            fileId:"",
            url:"https://images.unsplash.com/photo-1557844681-b0da6a516dc9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    verifyCode:{
        type:String,
        default:''
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

userModel.pre<IUser>('save',function(){
    if(!this.isModified('password')){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password || '', salt);
})

userModel.methods.comparePassword = function(password:string){
    return bcrypt.compareSync(password, this.password);
}

userModel.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET || '',{expiresIn:process.env.JWT_EXPIRE || '1h'})
}

const UserModel = mongoose.model<IUser>("User", userModel);

export default UserModel;
