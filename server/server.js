const express = require('express');
const app = new express();
const model = require('./model')

app.get('/data',(req,res)=>{
    model.getModule('user').find({user:'huangbin'},(err,doc)=>res.json(doc))
})
app.listen(9030,()=>{
    console.log(1);
})