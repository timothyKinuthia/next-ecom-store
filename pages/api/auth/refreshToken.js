import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../../models/userModel";
import validate from "../../../utils/validateUser";
import dbConnect from "../../../utils/dbConnect";
import { genAccessToken } from "../../../utils/generateToken";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function refreshToken(req, res) {
  await dbConnect();

  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(400).json({ msg: "login to continue" });

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded)
      return res.status(400).json({ msg: "Your session has expired!" });

    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).json({ msg: "This user does not exist!" });

    const accessToken = await genAccessToken(user._id);

    res.status(200).json({ accessToken, user });
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
}
