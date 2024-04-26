const mongoose=require('mongoose');
const {model,Schema}=mongoose;

const productSchema=new Schema({
    img:{type:String},
    name:{type:String},
    price:{type:Number},
    quantity:{type:Number}
})

const productModel=model('product',productSchema);

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const userModel=model('user',userSchema);

const orderSchema=new Schema({
    name:{
        type:String,
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    pincode:{
        type:Number
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    }
})

const orderModel=model('order',orderSchema);


module.exports={
    productModel,
    userModel,
    orderModel
}