const Group=require('../models/Group');
const createGroup=async (req,res)=>{
  try {
    const {name,color}=req.body;
    if(!name){
      return res.json({success:false,message:'Please fill all the fields'});
    }
    const newGroup=new Group({name,color});
    const savedNewGroup=await newGroup.save();
    res.status(201).json({success:true,group:savedNewGroup});
  } catch (error) {
    res.json({success:false, message: 'Something went wrong'});
  }
}
const getAllGroups=async (req,res)=>{
  try {
    const groups= await Group.find();
    res.status(200).send(groups);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
module.exports={createGroup,getAllGroups};