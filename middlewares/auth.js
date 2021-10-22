import jwt from 'jsonwebtoken';

import User from '../models/userModel';

export const auth = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json({ msg: "Please login to continue" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) return res.status(403).json({ msg: "Invalid authentication" });

    const user = await User.findOne({ _id: decoded.id });

    if (!user) return res.status(404).json({ msg: "This user does not exist!" });

    return user;

}