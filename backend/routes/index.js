import express from 'express';
import { router as UserRouter } from './User';

export const router = express.Router();

router.use("/user",UserRouter);
