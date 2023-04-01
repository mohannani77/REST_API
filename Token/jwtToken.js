const jwt=require('jsonwebtoken');
const jwtToken=(newdata)=>{
    const secretkey=process.env.JWT_SECRET_KEY;
    console.log("hii");
    let payload={
        id:newdata.id,
        login:newdata.login,
    };
    const token=jwt.sign(payload,secretkey,{expiresIn:'1h'})

    return token
}
module.exports = jwtToken