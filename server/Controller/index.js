const mongoose=require('mongoose');
const Schemas=require('../model/schema')


const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await Schemas.userModel.findOne({email,password});
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({message:"Login successfully"})
}catch(err){
        console.log(err);
        res.status(500).json({message:'server error'})
    }
}

const signUp=async(req,res)=> {
    const {username,email,password}=req.body;
    try{
        const User=await Schemas.userModel(req.body).findOne;
        if(!User){
        const user=await new Schemas.userModel(req.body).save();
            res.status(200).json({message:"user created successfully"})
        }
        }catch(err){
        res.status(500).json({message:"Error to create user"})
    }
}
const addProduct=async(req,res)=>{
    const {img,name,price,quantity}=req.body;
    try{
        const product=await new Schemas.productModel(req.body).save();
        res.status(200).json({message: "Added Successfully"});
    }catch(err){
        res.status(500).json({message:"Error to save product details"})
    }
}
const allOrder=async(req,res)=>{
    try{
        const list=await Schemas.productModel.find();
        res.status(200).json({orderList:list});
    }catch(err){
        res.status(500).json({message:"Didn't find any data "})
    }
}
const placeOrder=async(req,res)=>{
    try{
        await Schemas.orderModel(req.body).save();
        res.status(200).json({message:"Order saved successfully"})
    }catch(err){
        res.send(500).json({message:"Some error occured"})
    }
}
const deleteOrder=async(req,res)=>{
    const id=req.params.id;
    try{
        const response=await Schemas.productModel.deleteOne({_id:id});
        res.status(200).json({message:"Deleted successfully"})
    }catch(err){
        res.status(500).json({message:"unable to fetch data"})
    }
}
const getProduct=async(req,res)=>{
    const id=req.params.id;
    try{
        const response=await  Schemas.productModel.findOne({_id:id});
        res.status(200).json({response})
    }catch(err){
        res.status(500).json({message:"No such product found"})
    }
}
const updateProduct=async(req,res)=>{
    const id=req.params.id;
    const newData=req.body;
    try{
    const response=await Schemas.productModel.updateOne({_id:id},{$set:{...newData}});
    res.status(200).json({message:"Data updated successfully"})
}catch(err){
    res.status(500).json({message:"unable to update data"})
}
}





module.exports={
    login,
    signUp,
    addProduct,
    allOrder,
    placeOrder,
    deleteOrder,
    getProduct,
    updateProduct
}