const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTasksById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

// Task Management Routes 

router.get("/dashboard-data",protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/",protect,getTasks); // get all tasks
router.get("/:id",protect,getTasksById);  // get task by id
router.post("/", protect,adminOnly, createTask);  // create a new task
router.put("/:id", protect,updateTask);  // update a task
router.delete("/:id", protect,adminOnly, deleteTask);  // delete a task
router.put("/:id/status", protect, updateTaskStatus);  // update task status
router.put("/:id/todo", protect, updateTaskChecklist); // update task checklist


module.exports = router; 