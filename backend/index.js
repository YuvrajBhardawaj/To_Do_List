import express from 'express'
import mongoose from 'mongoose';
import { getItem, deleteItem, addItem } from './db.js';
const app=express()
app.use(express.json());
const uri='mongodb+srv://yuvrajbhardawaj31018:yuvraj123@cluster0.ftqitxg.mongodb.net/to_do_list'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
})
app.get('/api/to_do_list',async(req,res)=>{
    const tasks=await getItem()
    res.send(tasks)
})
app.post('/api/to_do_list',async(req,res)=>{
    const {list}=req.body
    const result=await addItem(list)
    res.send(result)
})
app.delete('/api/to_do_list/:id',async(req,res)=>{
    const _id=req.params.id
    const result=await deleteItem(_id)
    res.send(result)
})
app.listen(3000,()=>{
    console.log("Server running at 3000")
})