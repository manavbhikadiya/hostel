const express = require('express');
const app = express();
const db  = require('./db/dbcon');
const User  = require('./model/userSchema');

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.post("/add",async(req,res)=>{

    const {name,email} = req.body;

    try {
        
        const data = new User({name:name,email:email});
        await data.save();
        res.status(201).send({message:"User created successfully"});

    } catch (error) {
        console.log(error)
    }

})

app.listen(8000,()=>{
    console.log(`listening to the port ${8000}`);
})