import bcrypt from "bcrypt";

import User from "../../../models/userModel";
import validate from "../../../utils/validateUser";
import dbConnect from "../../../utils/dbConnect";
import { genAccessToken, genRefreshToken } from "../../../utils/generateToken";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function loginUser(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      await signin(req, res);
      break;
  }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "This user does not exists" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return res.status(403).json({ msg: "Invalid credentials!" });

    const accessToken = await genAccessToken(user._id);
    const refreshToken = await genRefreshToken(user._id);

    res
      .status(201)
      .json({ msg: "logged in success", user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
