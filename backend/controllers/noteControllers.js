const Note=require('../models/Note');
const createNote=async (req,res)=>{
  try {
    const {content,date,time,groupId}=req.body;
    const newNote=new Note({content,date,time,groupId});
    const savedNote=await newNote.save();
    res.status(201).json({success:true,note:savedNote});
  } catch (error) {
    res.json({success:false, message: 'Something went wrong'});
  }
}
const getAllNotes=async (req,res)=>{
  try {
    const {groupId}=req.params;
    if (!groupId) {
      return res.status(400).send('Group ID is required');
    }
    const notes= await Note.find({groupId});
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
module.exports={createNote,getAllNotes};