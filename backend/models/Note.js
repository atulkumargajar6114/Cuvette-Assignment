const mongoose=require('mongoose');
const noteSchema=new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  date:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required:true
  },
  groupId:{
    type:mongoose.Schema.Types.ObjectId,
    
  }
});
const Note=mongoose.model('Note',noteSchema);
module.exports=Note;