//bcrypt for hashing password
const bcrypt = require("bcrypt");

//jwt to create token
const jwt = require("jsonwebtoken");
require("dotenv").config();

//to hash password
const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

//compares hashed password and request password
const hashCompare = (password, hash) => {
  return bcrypt.compare(password, hash);
};

//jwt(json web token) to create token for authentication 
const createToken = ({ firstName, lastName, email, role }) => {
  let token = jwt.sign(
    { firstName, lastName, email, role },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRE,
    }
  );
  return token;
};

//forgot password validation token
const forgetPasswordToken = ({ firstName, email }) => {
  let token = jwt.sign({ firstName, email }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE,
  });
  return token;
};

//decode token
const decodeToken = (token) => {
  let data = jwt.decode(token);
  return data;
};

//decode forgot password token
const decodePasswordToken = (token) => {
  let data = jwt.decode(token);
  return data;
};

//validation for token expiration
const validate = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      let data = decodeToken(token);

      if (Math.floor(Date.now() / 1000) <= data.exp) {
        next();
      } else {
        res.status(401).send({
          message: "Token Expired",
        });
      }
    } else {
      res.status(401).send({
        message: "Token Not Found",
      });
    }

    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

//admin validation
const roleAdmin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      let data = decodeToken(token);

      if (data.role === "admin") {
        next();
      } else {
        res.status(401).send({
          message: "Token Expired",
        });
      }
    } else {
      res.status(401).send({
        message: "Token Not Found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validate,
  roleAdmin,
  forgetPasswordToken,
  decodePasswordToken,
};
