import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    task:{type:String, required:true}
})
const mylist=new mongoose.model('MyList',taskSchema)
export default mylist