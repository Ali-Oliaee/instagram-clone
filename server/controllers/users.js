import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signup = async (req, res) => {
  res.send("signup");
};

export const signin = async (req, res) => {
  res.send("singin");
};
