const express=require('express');
const Router=express.Router();
const {createGroup,getAllGroups}=require('../controllers/groupControllers');
Router.post('/create',createGroup);
Router.get('/all',getAllGroups);
module.exports=Router;