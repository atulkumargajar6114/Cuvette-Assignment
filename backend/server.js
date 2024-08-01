const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const connectDB=require('./config/db');
const groupRoute=require('./routes/groupRoutes');
const noteRoute=require('./routes/noteRoutes');
app.use(cors({
  origin:'*'
}))
app.use(bodyParser.json());
connectDB();
app.use('/api/group',groupRoute);
app.use('/api/note',noteRoute);
app.get('/',(req,res)=>{
  res.send('Hello');
})
app.listen(3000,()=>{
  console.log('Server is started');
})