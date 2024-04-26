const express=require('express');
const  app = express();
const cors=require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// db Connection

require('./db_connection')
require('./model/schema')


app.use('/api',require('./routes/index'))
app.listen(4000,()=>{
    console.log("server is running in the port 4000")
})