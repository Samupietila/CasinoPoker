const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { requireAuth, admin } = require("../middleware/requireAuth");

// Login
router.post("/login", userController.loginUser);

// Create a New User
router.post("/register", userController.createUser);

// Verify Token
router.use(requireAuth);

// Get Single User by ID
router.get("/:id", userController.getUser);

// Get Single User by Username
router.get("/username/:username", userController.getUserByUsername);

// Update User by ID
router.patch("/:id", userController.patchUser);

// Repalce User by ID
router.put("/:id", userController.putUser);

// Delete User by ID
router.delete("/:id", userController.deleteUser);

// Get All Users
router.get("/", userController.getUsers);

// Update User Roles
router.patch("/roles/:username", userController.addRoles);

module.exports = router;
