// Date: 7/18/25
// Adapted From
//https://www.youtube.com/watch?v=V8dYGNfHjfk&t=1743s
//Learned how to create a localhost for mongo db

// Date: 7/26/25
// Adapted From
//https://mongoosejs.com/docs/schematypes.html
//Learned about schema type as well as incorporated some_id schema for user id.
const mongoose =require("mongoose")

mongoose.connect("mongodb+srv://steve:testing123@cluster0.5jckiya.mongodb.net/application?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
   console.log("mongodb connected"); 
})
.catch(() =>{
    console.log("failed to connect");
})
const SignUpSchema= new mongoose.Schema({
     firstname:{
        type:String,
        required:true
    },
     lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
      password:{
        type:String,
        required:true
    }
    
})
const collection1=new mongoose.model("Collection1",SignUpSchema)

const skillSchema= new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection1", 
    required: true
 },
  type:{
        type:String,
        required:false
    },
    level:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:false
    }
})
const collection2=new mongoose.model("collection2",skillSchema)


module.exports = { collection1, collection2 };
