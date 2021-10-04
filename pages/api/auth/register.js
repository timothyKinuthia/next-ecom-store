import bcrypt from "bcrypt";

import User from "../../../models/userModel";
import validate from "../../../utils/validateUser";
import dbConnect from "../../../utils/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function registerUser(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      await register(req, res);
      break;
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const error = validate(name, email, password, confirmPassword);

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "This user already exists" });

    if (error.message) {
      return res.status(400).json({ msg: error.message });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: passwordHash });

      res.status(201).json({ msg: "Registered user", user: newUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
