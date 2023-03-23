const express=require('express')
// const jwt=require('jsonwebtoken')
const router=express.Router()
const User=require('../models/user')


router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
   try {
    const data=await User.findOne({email})
    if(data){
       return res.status(400).send("Emailid is already in Use")
    }
    const ndata=new User({name,email,password})
    await ndata.save()
    res.status(200).send({status: 'success',data: ndata})
   } 
   catch (error) {
    res.status(400).send(error)
   }
})


router.get('/users',async (req, res) => {
    try{
        const ndata=await User.find()
        res.status(200).send(ndata)
    }
    catch(err){
        res.status(400).send(err)
    }
})
module.exports = router