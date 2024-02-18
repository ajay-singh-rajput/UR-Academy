import mongoose, { Document, Schema } from "mongoose";


interface Chapter {
    id: string;
    title: string;
    description: string;
    // sourceLink: { name: string; url: String }[] | null;
    mediaLink?: String | '';
}

interface Course extends Document {
    name: string;
    title: string;
    createdBy: mongoose.Schema.Types.ObjectId | string;
    subscriber: (mongoose.Schema.Types.ObjectId | string)[];
    price: number;
    chapter: Chapter[];
    category:String;
    thumbnail:{
        fileId:string;
        url:string;
    };
}


const courseModel:Schema<Course> = new mongoose.Schema<Course>({
    name:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true
    },
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    subscriber:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    price:{
        type:Number,
        default:0,
        require:true
    },
    category:{
        type:String,
        require:true,
    },
    chapter:[{
        id:String,
        title:String,
        description:String,
        // sourceLink:[{name:String,url:String}],
        mediaLink:{type:String, default:''}
    }],
    thumbnail:{
        type:Object,
        default:{
            fileId:"",
            url:"https://images.unsplash.com/photo-1557844681-b0da6a516dc9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
},{
    timestamps:true
})

const CourseModel = mongoose.model('Course', courseModel);
export default CourseModel;