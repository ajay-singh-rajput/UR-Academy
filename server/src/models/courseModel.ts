import mongoose, { Document, Schema } from "mongoose";


interface Chapter {
    id: string;
    title: string;
    description: string;
    sourceLink: { name: string; url: URL }[];
    mediaLink?: URL | '';
}

interface Course extends Document {
    name: string;
    title: string;
    createdBy: mongoose.Schema.Types.ObjectId | string;
    subscriber: (mongoose.Schema.Types.ObjectId | string)[];
    price: number;
    chapter: Chapter[];
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
    chapter:[{
        id:String,
        title:String,
        description:String,
        sourceLink:[{name:String,url:URL}],
        mediaLink:{type:URL, default:''}
    }]
},{
    timestamps:true
})

const CourseModel = mongoose.model('Course', courseModel);
export default CourseModel;