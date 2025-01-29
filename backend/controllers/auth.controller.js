import User from "../models/user.schema.js";
import { comparePassword, hashPassword } from "../utils/hash.utils.js";
import { generateToken } from "../utils/token.utils.js";

//create user /sign-up
export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(201).json({
      data: { _id: user._id, email: user.email, name: user.name },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("createUser error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({
      data: { _id: user._id, email: user.email, name: user.name },
      message: "User login successfully",
    });
  } catch (error) {
    console.log("loginUser error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("logoutUser error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const email = req.user.email;
    const { name, password, newPassword } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and original password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify original password
    const isPasswordValid = await comparePassword(password, user.password); // Assume verifyPassword checks hashed passwords
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid original password" });
    }

    // Handle updates
    if (name) {
      user.name = name; // Update name if provided
    }

    if (newPassword) {
      if (newPassword === password) {
        return res
          .status(400)
          .json({
            message: "New password cannot be the same as the original password",
          });
      }
      const hashedNewPassword = await hashPassword(newPassword); // Hash the new password
      user.password = hashedNewPassword; // Update password
    }

    await user.save(); // Save updated user data

    return res.status(200).json({
      data: { _id: user._id, email: user.email, name: user.name },
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("updateUser error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.user);
    const user = await User.findById(userId);
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log("getProfile error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
