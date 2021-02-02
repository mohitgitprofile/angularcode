const express = require('express');
const path =require('path');
const app = express();

app.use(express.static(path.join(__dirname,'dist')));

console.log(__dirname);
app.get('/*',(req,res)=>{
res.sendFile(__dirname +"/dist/index.html");
})
let port = process.env.NODE_ENV || 1527;

app.listen(port,()=>console.log(`server is running on port ${port}`));