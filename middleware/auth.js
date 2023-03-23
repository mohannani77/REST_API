const jwt=require('jsonwebtoken');
const auth=(req,res,next)=>{
    const token=req.header('Authorization');
  
    if(!token) return res.status(400).send("Access Denied...........Inavalid Token")
    try {
        const secretkey=process.env.JWT_SECRET_KEY
        // console.log(secretkey);
        const user=jwt.verify(token,secretkey)
        req.user=user
        next()
    } catch (error) {
       return res.status(400).send("Access denied.................Not authenticated")
    }
 
}
module.exports ={auth}