import { Router } from "express";
import { deleteUser, getUser, listUsers, logOut, signIn, signUp, updateEmail, updatePassword } from "./controllers/authController.js";

const router = Router();

// List all users
router.get("/user", listUsers);

// Retrieve a user
router.get("/user/:id", getUser);

// Sign up
router.post("/signUp", signUp);

// Sign in
router.post("/signIn", signIn);

// Log out
router.post("/signOut", logOut);

// Update email
router.put("/email/:id", updateEmail);

// Update password
router.put("/password/:id", updatePassword);

// Delete account
router.delete("/user:id", deleteUser);

export default router;
