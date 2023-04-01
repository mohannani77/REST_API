const express=require('express');
const User=require('../models/user')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwtToken=require('../Token/jwtToken')
router.post('/auth/login',async(req,res)=>{
    const {login,password} = req.body
    try {
        const data=await User.findOne({login})
        if(!data){
           return res.status(404).send("User not found")
        }

        const result= await bcrypt.compare(password, data.password)
        if(!result){
            return res.status(404).send("Password is incorrect")
        }
        let token=jwtToken(data)

        res.status(200).send({"status":"sucess","token" :token})
    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = router