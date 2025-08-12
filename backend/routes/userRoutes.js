const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById} = require("../controllers/userController");

// Admin routes
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, adminOnly, getUserById);
// router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;