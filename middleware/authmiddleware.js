const jwt = require("jsonwebtoken")

const requireAuth = (req, res, next)=>{

    const authHeader = req.headers.authorization;
    // console.log(req.headers)

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status({
                    message: "not authorize"
                });
            }
            // console.log(decoded)
            req.user =decoded;
            next();
        });
    } else {
        res.status({
            message:" Unauthorized due to invalid credentials"
        });
    }
}

module.exports={
    requireAuth
}
