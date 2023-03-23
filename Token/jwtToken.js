const jwt=require('jsonwebtoken');
const jwtToken=(newdata)=>{
    const secretkey=process.env.JWT_SECRET_KEY;
    // console.log(secretkey);
    let payload={
        id:newdata.id,
        name:newdata.name,
        email:newdata.email
    };
    const token=jwt.sign(payload,secretkey,{expiresIn:'1h'})
    return token
}
module.exports = jwtToken