const jwt = require('jsonwebtoken');
function authMiddleware(req,res,nextx){
    const authorization =req.headers.authorization;
    const [schema,token] = authorization ? authorization.split(" "):[]
    if(schema !== 'Bearer' || !token){
        return res.status(401).json({message:"Authorization token is"})
    }
    const secretkey = process.env.JWT_SECRET

    if(!secretkey)
    {
        return nextx(new Error('JWT_SECRET is not defined!'))
    }
    try{
        req.user = jwt.verify(token,secretkey);
        return nextx();

    }catch(error){
        return res.status(401).json({message:"the token is either expired or invalid"})
    }
}
module.exports=authMiddleware;