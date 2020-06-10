const express = require('express');
const app = express();

//config express
app.use(express.urlencoded({extended:false}))
app.use(express.json());
//routes
app.get("/",(req,res)=>{
  res.send("home");
})

const PORT = 3020;
app.listen(PORT,()=>{
  console.log(`server running http://localhost:${PORT}`);
})