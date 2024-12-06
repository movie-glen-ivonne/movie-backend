import {Request, Response, NextFunction} from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'


export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {

    const token = req.headers.authorization?.split(' ')[1]
    console.log(token);
    try {
        if (!token) {
            return res.status(400).json({message: "Forbiden access, token is mising!"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        if (!decoded) {
            return res.status(400).json({message: "Forbiden access, token is not valid"})

        }

        (req as Request & {user: any}).user = decoded
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(400).json({message: "Session expired, login again"})
        }
        console.log(err)
        return res.status(500).json({message: "Internal server error!"})
    }
}
