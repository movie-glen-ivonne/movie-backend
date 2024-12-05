import { AppDataSource } from "../database/db";
import { getProfile } from '../services/userProfile'
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await userRepository.find({ relations: ["libraries"] });
    if (users.length < 1) {
      return res.json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Internal server error 🔴` });
  }
};

export const getUserProfile = async ( req: Request, res: Response): Promise<any> => {
  var { id } = await req.params;

  try {
    if (id == undefined) {
      id = (req as Request & { user: any }).user.id;
    }
    const userByID = await userRepository.findOneBy({ id: parseInt(id) });
    if (!userByID) {
      return res.json({ message: `User not found` });
    }
    return res.status(200).json({message : 'Profile data', userByID});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Internal server error 🔴` });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = await req.params;

  const { name, email, newPassword, isAdmin} = req.body;
  const image = '/public/images/' + req.file?.filename

  try {
    const userByID = await userRepository.findOneBy({ id: parseInt(id) });
    if (!userByID) {
      return res.json({ message: `No user found` });
    }

    // const result = await AppDataSource.getRepository(User).findOneBy({email : email})
    // if (result) {
    //   return res.status(404).json({message: "Email already used"})
    // }

    userByID.name = name ?? userByID.name;
    // userByID.email = email ?? userByID.email;
    // userByID.email = email ?? userByID.email;
    if (req.file?.filename !== undefined) {
      userByID.photo = image
    }
    userByID.isAdmin = isAdmin ?? userByID.isAdmin;


    if(newPassword){
        const salt = await bcrypt.genSalt(10)
        let updatedPassword = await bcrypt.hash(newPassword, salt)
        if(updatedPassword != userByID.password){
          userByID.password = updatedPassword
        }
    }
    
    const savedUser = await userRepository.save(userByID);

    return res.status(200).json("User updated successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Internal server error 🔴` });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = await req.params;
  const userId = (req as Request & { user: any }).user.id;

  try {

    if (userId == id) {
      return res.json({ message: `You can't delete your own account!` });
    }
    const deleteUserByID = await userRepository.delete({ id: parseInt(id) });
    if (deleteUserByID.affected === 0) {
      return res.json({ message: `No user found` });
    }

    return res.status(200).json(`User deleted`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Internal server error 🔴` });
  }
};

export const searchUser = async (req: Request, res: Response): Promise<any> => {
  const { search } = req.query;

  try {
    const users = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.libraries", "libraries")
      .where("user.email LIKE :search", { search: `%${search}%` })
      .orWhere("user.name LIKE :search", { search: `%${search}%` })
      .getMany();

    if (users.length < 1) {
      return res.json({ message: "No users found" });
    } 

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Internal server error 🔴` });
  }
};