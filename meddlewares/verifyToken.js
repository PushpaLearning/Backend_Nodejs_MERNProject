

// const Vendor = require('../models/Vendor');
// const jwt = require('jsonwebtoken');
// const dotEnv  = require('dotenv');

// dotEnv.config();

// const secretKey = process.env.WhatIsYouName;

// const verifyToken = async(req,res,next)=>{

//     const token = req.headers.token;

//     if(!token){
//         return res.status(401).json({error:"Token is required"})
//     }

//     try{
//         const decoded = jwt.verify(token,secretKey)
//         const vendor = await Vendor.findById(decoded.vendorId);

//         if(!vendor){
//             return res.status(404).json({error:"Vendor not found"})
//         }

//         req.vendorId = vendor._id

//         next();
//     }
//     catch(error){

//         console.error(error)
//         return res.status(500).json({error: "Invalid Token"});
//     }
// }

// module.exports = verifyToken


// const Vendor = require('../models/Vendor');
// const jwt = require('jsonwebtoken');
// const dotEnv = require('dotenv');

// dotEnv.config()

// const secretKey = process.env.WhatIsYourName


// const verifyToken = async(req, res, next) => {
//     const token = req.headers.token;

//     if (!token) {
//         return res.status(401).json({ error: "Token is required" });
//     }
//     try {
//         const decoded = jwt.verify(token, secretKey)
//         const vendor = await Vendor.findById(decoded.vendorId);

//         if (!vendor) {
//             return res.status(404).json({ error: "vendor not found" })
//         }

//         req.vendorId = vendor._id

//         next()
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({ error: "Invalid token" });
//     }

// }

// module.exports = verifyToken


const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYouName; // Make sure this key matches in your .env file

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("Token is "+ token);
        console.log("secretkey" + secretKey);
        // Log the decoded token to ensure it has the expected structure
        console.log("Decoded Token: ", decoded);

        const vendor = await Vendor.findById(decoded.venddorId);
        console.log("vendor is  "+ vendor);

        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found by token" });
            
        }

        req.vendorId = vendor._id;

        next();
    } catch (error) {
        console.error("Error verifying token: ", error);
        
        // Provide a more specific error message if the token is invalid or expired
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid Token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token has expired" });
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = verifyToken;
