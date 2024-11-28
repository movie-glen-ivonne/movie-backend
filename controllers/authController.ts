// authController.ts
import { Request, Response } from 'express';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/db';

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  
  const { name, email, password, isAdmin } = req.body;
  const image = '/public/images/' + req.file?.filename;
  const userRepository = AppDataSource.getRepository(User);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = hashedPassword
  console.log(req.file?.filename)
  if (req.file?.filename !== undefined) {
    newUser.photo = image
  }
  if (isAdmin) {
    newUser.isAdmin = isAdmin
  }
  await userRepository.save(newUser);
  res.status(201).json({ message: 'User registered successfully.' });
};


export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET as string, {
    expiresIn: '2h',
  });

  res.status(200).json({user : {
      name : user.name,
      isAdmin: user.isAdmin,
      id: user.id
  }, token})
};
