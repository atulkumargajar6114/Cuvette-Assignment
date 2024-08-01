const express=require('express');
const Router=express.Router();
const {createNote,getAllNotes}=require('../controllers/noteControllers');
Router.post('/create',createNote);
Router.get('/all/:groupId',getAllNotes);
module.exports=Router;