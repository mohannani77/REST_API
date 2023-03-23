const express=require('express')
const route=express.Router();
const Post=require('../models/post');
const jwt=require('jsonwebtoken');
const {auth}=require('../middleware/auth');
const { response } = require('express');



route.post('/posts',auth,async (req,res)=>{
    const {title,body,image} = req.body;
    const {id}=req.user
    try {
        const data=new Post({title,body,image,user:id})
        await data.save()
        res.status(200).send({"status":"Post created","data":data})
    } catch (error) {
        res.status(400).send(error)
    }
})



route.get('/posts',auth,async (req, res) => {

    try {

        const data=await Post.find()

        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }

})

route.put('/posts/:postId',auth, async (req, res) =>{
    const pid=req.params.postId
    const {id}=req.user
    const {title,body,image}=req.body
    try {
        const data=await Post.findById(pid)
        if(data.user !== id) return res.status(404).send("Authorization faileddd")

        if(!data) return res.status(404).send("Inavalid ID")
        const ndata=await Post.findByIdAndUpdate(
            pid,
            {title,body,image},
            {new:true}
        )
        await ndata.save()
        res.status(400).send({"status": "success..."})
    } catch (error) {
        res.status(404).send(error.message)
    }
})


route.delete('/posts/:postId',auth,async (req, res) => {
    const pid=req.params.postId
    const {id}=req.user
    try {
        const data=await Post.findById(pid)
        if(data.user !== id) return res.status(404).send("Authorization faileddd")
        await Post.findByIdAndDelete(pid)
        res.status(200).send("Sucessfully deleted..")
    } catch (error) {
        res.status(404).send(error.message)
    }
})


module.exports =route;