import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,
            email,
            password: hash
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));
        const isValid = await bcrypt.compare(req.body.password, user.password);

        if (!isValid) return next(createError(400, "Wrong password or username"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).json({ ...otherDetails });
    } catch (error) {
        next(error);
    }
}