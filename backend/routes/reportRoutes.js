const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const { exportTasksReport, exportUsersReport } = require("../controllers/reportController");


router.get("/exports/tasks", protect, adminOnly, exportTasksReport);
router.get("/exports/users", protect, adminOnly, exportUsersReport);



module.exports = router;