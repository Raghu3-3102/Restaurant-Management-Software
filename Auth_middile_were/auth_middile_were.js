// const jwt = require("jsonwebtoken");
// var security_key = "RAGHU";

// const auth_middile_were = async (req, res, next) => {

//   try {
//     // const token = req.headers["authorization"].split(" ")[1];
//     // const token = req.headers.authorization.split(" ")[1];
//     const token = req.headers["authorization"].split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {

        
//         return res.status(401).send({
//           message: "authses fail",
//           success: false
//         });
//       } else {
//         req.body.userId = decoded.id;
//         console.log(req.body.userId);
//         console.log(token);
//         console.log(process.env.JWT_SECRET);
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({ message: "autrh failes", success: false });
//   }

// //   const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
// // console.log("Token:", token);

// // jwt.verify(token, security_key, (err, decoded) => {
// //   if (err) {
// //     console.error("JWT Verification Error:", err);
// //     return res.status(401).send({
// //       message: "auth fail",
// //       success: false
// //     });
// //   } else {
// //     console.log("Decoded Token:", decoded);
// //     req.body.userId = decoded._id;
// //     console.log("User ID:", req.body.userId);
// //     next();
// //   }
// // });



// };

// module.exports = auth_middile_were;

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "No token provided", success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Failed to authenticate token", success: false });
      } else {
        req.body.userId = decoded.id;
        console.log(req.body.userId);
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Authentication failed", success: false });
  }
};

module.exports = auth;
