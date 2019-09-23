import jwt from 'jsonwebtoken'

import {JsonWebTokenConfig, RequestData} from './types'

const verifyJWT = (config: JsonWebTokenConfig) => {
  jwt.verify(config.token, config.secretOrPublicKey, config.options)
}

const generateJWT = (data: RequestData, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions) =>
  jwt.sign(data, secretOrPrivateKey, options)

export {verifyJWT, generateJWT}
