const { verify } = require("../helpers/jwt")

class MiddlewareAuth {
  static async authentication(req, _, next) {
    try {
      const { authorization } = req.headers
      const { uuid } = await verify(MiddlewareAuth.getToken(authorization))
      if(!uuid) throw new Error()
      next()
    } catch (error) {
      console.log(error);
    }
  }

  static getToken(authorization) {
    try {
      if(!authorization)
        throw new Error()
      const token = authorization.split(" ")     
      if((token.length !== 2) || (token?.[0] !== "Bearer") || (token?.[1] === "undefined"))
        throw new Error()
      
      return token[1]
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MiddlewareAuth