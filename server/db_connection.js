const mongoose=require('mongoose');

const connectToDatabase=async()=>{
    try{
        const mongoURI='mongodb://localhost:27017/my_cart_app';
        await mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log( 'Database Connected Successfully!')
    }catch(err){
        console.log(err,"Unable to connect to the Database")
    }
}
connectToDatabase();