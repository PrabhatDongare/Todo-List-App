const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const fetchuser = (req, res, next) => {
    // verifying token from header
    const token = req.header("authToken")
    if(!token){
        res.status(401).json({ error: "Authentication token not sent" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(500).json({ error: "Authenticate with valid token" });        
    }
}
module.exports = fetchuser;