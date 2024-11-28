import {NextFunction, Request, Response} from 'express'
import { AppDataSource } from '../database/db'
import {User} from "../entities/User"

export const checkIfUserExists = (checkForExistence: boolean) => {

    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const {name, email, password} = req.body

        try {

            const result = await AppDataSource.getRepository(User).findOneBy({email : email})
            if (checkForExistence) {

                if (result) {
                    (req as Request & {user: User}).user = result
                    next()
                } else {
                    return res.status(400).json({message: "User does not exist!"})
                }
            } else {

                if (result) {
                    return res.status(404).json({message: "User already exists"})
                }
    
                next()
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Internal server error!"})
        }
    }
}