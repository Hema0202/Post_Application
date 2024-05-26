const express = require('express')
const mongoose = require('mongoose');
const router = require('./routes/route');

const app = express();

mongoose.connect('mongodb://localhost:27017/PostApplication')
.then(()=>console.log('Connected with Database'))
.catch((err)=>console.log(err.message));

app.use(express.json());
app.use('/',router);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  

app.listen(process.env.PORT || 3000 , (err) => {
  if(err) console.log(err.message);
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
})