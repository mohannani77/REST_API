const express=require('express');
const User=require('../models/user')
const router=express.Router()
const jwtToken=require('../Token/jwtToken')
router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try {
        const data=await User.findOne({email})
        if(!data){
           return res.status(404).send("User not found")
        }
        if(data.password !== password){
            return res.status(404).send("Password is incorrect")
        }
        let token=jwtToken(data)
        res.status(200).send({"status":"sucess","token" :token})
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router