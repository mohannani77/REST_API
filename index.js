
const mongoose = require('mongoose');
const port = 3000
const app = require('./app');
mongoose.connect('mongodb://localhost:27017/REST_API').then(()=>
  console.log("mongoDB connected")
).catch((err)=> console.log(err))

// mongoose.connection.once('open', () =>{
//     console.log('connection established')
// }).on('connectionError',(err) =>{
//     console.log(err);
// })

app.listen(port, () => console.log("server is running......"));