import { Router } from "express";
import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {verifyToken} from '../middleware/auth.js'

dotenv.config();
const router = Router();

router.get("/:id", verifyToken,  async (req, res) => {
  try {
    const id = req.params.id;
    const foundUser = await user.findById(id).select("-password");
    if (!foundUser)
      return res.status(404).send({ message: "No user found" });

    res.status(200).send({ message: "User found successfully", user: {email: foundUser.email , name: foundUser.name} });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await user.findOne({ email });
    if (!foundUser)
      return res.status(404).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch)
      return res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: foundUser._id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).send({
      message: "Login successful",
      token,
      user: { id: foundUser._id, name: foundUser.name, email: foundUser.email }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});


router.put("/:id", verifyToken,  async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    const foundUser = await user.findById(id);
    if (!foundUser)
      return res.status(404).send({ message: "No user found" });

    if (name) foundUser.name = name;
    if (email) foundUser.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      foundUser.password = hashedPassword;
    }

    await foundUser.save();
    res.status(200).send({ message: "User updated successfully", user: { name: foundUser.name, email: foundUser.email } });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

router.delete("/:id",verifyToken,  async (req, res) => {
  const id = req.params.id;

  try {
    const foundUser = await user.findById(id);
    if (!foundUser)
      return res.status(404).send({ message: "No user found" });

    await user.deleteOne({ _id: id });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

export default router;
