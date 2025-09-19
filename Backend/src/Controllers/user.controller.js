import httpStatus from 'http-status';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const login = async (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message: "Username and password are required"});
    }
    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid credentials"});
        }

        let token = crypto.randomBytes(20).toString('hex');
        user.token = token;
        await user.save();

        return res.status(httpStatus.OK).json({message: "Login successful", token});
    } catch (e) {
        return res.status(500).json({message: `Something went wrong ${e}`});
    }
}


const register = async (req,res) => {
    const {name, username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            password: hashedPassword
        });

        await newUser.save();
        console.log("New user saved:", newUser);
        return res.status(httpStatus.CREATED).json({message: "User registered successfully"});

    } catch(e){
        return res.status(500).json({message: `Something went wrong ${e}`});
    }
}

export {login, register};
