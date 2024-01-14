import mongoose from "mongoose";
import mylist from "./modules/dbModule.js";
export const getItem=async()=>{
    try{
        const getitems=await mylist.find()
        return getitems
    }
    catch(err){
        console.log(err)
    }
}
export const deleteItem=async(id)=>{
    try{
        const delItems=await mylist.deleteOne({_id:id})
        return delItems
    }
    catch(err){
        console.log(err)
    }
}
export const addItem=async(list)=>{
    try{

        const task=new mylist({
            task:list
        })
        task.save()
        return {success:true}
    }
    catch(err){
        console.log(err)
    }
}