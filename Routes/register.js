const express=require('express')
// const jwt=require('jsonwebtoken')
const bcypt=require('bcrypt')
const router=express.Router()
const User=require('../models/user')

router.post('/auth/signup',async(req,res)=>{
    const {login,password}=req.body
    if(login !== String || password !== String){
        return res.status(400).send("login and password must be strings")
    }
  
   try {
    const data=await User.findOne({login})
    if(data){
       return res.status(400).send("Emailid is already in Use")
    }
 
    const salt = await bcypt.genSalt(10);
    const npassword = await bcypt.hash(password, salt);

    const ndata=new User({login,password:npassword})
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