import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updatePassword,
} from "../controllers/userController.js";
import authMiddleware from "../middlware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.put("/password", authMiddleware, updatePassword);

export default userRouter;
