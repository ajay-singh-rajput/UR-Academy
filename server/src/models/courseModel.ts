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
    }]
},{
    timestamps:true
})

const CourseModel = mongoose.model('Course', courseModel);
export default CourseModel;