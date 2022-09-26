const {expressJwt:jwt} = require('express-jwt');

const  authJwt = () =>{
    const secret = process.env.JWT_SECRET;
    return jwt({
        secret,
        algorithms: ['HS256']

    })
}

module.exports = authJwt;