const jwt = require("jsonwebtoken");
const {User,Postroom} = require("../model/register");

const authenticate = async (req , res , next) => {
    try{
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token , "iambrijeshsinghfrommadanmohanmalaviya");
        const rootUser = await User.findOne({_id : verifyToken._id,"tokens.token":token});

        if(!rootUser){
            throw new Error("User Not Found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }
    catch(err){
        res.status(401).send("Unauthorized : No token Provided");
        console.log("error");
    }
}


module.exports = authenticate;