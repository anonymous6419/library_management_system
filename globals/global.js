const jwt = require('jsonwebtoken')

const tokenGenerator = (input) => {
    const token = jwt.sign(input, process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_IN,// "1m",
    });
    return token;
  };
  
  const tokenVerifier = (token) => {
    const decoded = jwt.verify(
      token.toString(),
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
        
          return err;
        }
        return decoded;
      }
    );
    return decoded;
  };
  
  
  module.exports = {
    tokenGenerator,
    tokenVerifier,
   };