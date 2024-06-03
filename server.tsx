// import express from "express"


// const app=express();
// const Port=5000;

// app.get('/get',function(req,res){
//     res.send("he world")
// })

// app.listen(Port,()=>{
//     console.log(`server is running on ${Port}`)
// })

import express from 'express';
import { createRequestHandler } from '@remix-run/express';



const app = express();
const PORT = process.env.PORT || 5000;



app.get('/get', function (req, res) {
  res.send('he world');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });