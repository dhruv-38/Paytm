import express from 'express';
import { Users } from '../db';
import zod from 'zod';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config';

export const router = express.Router();

const signupBody=zod.object({
    email:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
});

router.post('/signup',async (req,res)=>{
    const {success}=signupBody.safeParse(req.body);
    if (!success){
        return res.status(411).json({
            message:"Email already taken/Incorrect inputs"
        });
    }

    const existingUser = await Users.findOne({
        email:req.body.email
    });

    if (existingUser){
        return res.status(411).json({
            message:"Email already taken/Incorrect inputs"
        });
    }

    const user = await Users.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId=user._id;
    const token = jwt.sign({userId},JWT_SECRET);

    return res.status(200).json({
        message: "User created successfully",
        token: token
    })
    
});

const signinBody=zod.object({
    email:zod.string().email(),
    password:zod.string()
});

router.post('/signin',async (req,res)=>{
    const {success}=signinBody.safeParse(req.body);
    if (!success){
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const existingUser = await Users.findOne({
        email:req.body.email,
        password:req.body.password
    });

    if (!existingUser){
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const userId=existingUser._id;
    const token = jwt.sign({userId},JWT_SECRET);

    return res.status(200).json({
        token: token
    });
    
})