import jwt from "jsonwebtoken"

export const generateToken = (payload: any) => {
  return jwt.sign(
    payload,
    process.env.TOKEN_SECRET!,
    { expiresIn: "30d"}
  )
}

export const verifyToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.TOKEN_SECRET!
  )
}