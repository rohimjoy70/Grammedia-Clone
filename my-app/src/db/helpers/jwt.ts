import * as jose from "jose";
import jwt, { JwtPayload } from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;

export const createToken = (paylod: JwtPayload) => {
  return jwt.sign(paylod, secret);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};

export const verifyJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(secret);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
