import express from 'express';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../controllers/user.controller';
import { UserServices } from '../services/users.services.js';
import { UserControllers } from '../controllers/user.controller.js';
import { UserRepositories } from '../repositories/user.repository.js';

const router = express.Router;
const prisma = new PrismaClient();

// 의존성 만들어 주기
const userController = new UserControllers(userService);
const userService = new UserServices(userRepository);
const userRepository = new UserRepositories(prisma);

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/myInfo', userController.myInfo);

export default router;
