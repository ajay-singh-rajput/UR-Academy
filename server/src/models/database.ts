import mongoose from "mongoose";

export const connectDatabase = async ()=>{
    try {
        const mongoURL:string = process.env.MONGODB_URL || ''
        
        await mongoose.connect(mongoURL)
        console.log('Database connected');
        
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}