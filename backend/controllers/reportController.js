const Task = require("../models/Task.model.js");
const User = require("../models/User.model.js");
const excelJS = require("exceljs");

// @desc    Export tasks report
// @route   GET /api/reports/exports/tasks
// @access  Admin
const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Report");
    worksheet.columns = [
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 20 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned To", key: "assignedTo", width: 30 },
    ];

  tasks.forEach((task) => {
  let dueDateStr = "";
  if (task.dueDate instanceof Date && !isNaN(task.dueDate)) {
    dueDateStr = task.dueDate.toISOString().split("T")[0];
  } else if (typeof task.dueDate === "string") {
    dueDateStr = task.dueDate.split("T")[0];
  }

  const assignedTo = task.assignedTo
    .map((user) => `${user.name} (${user.email})`)
    .join(", ");
  worksheet.addRow({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: dueDateStr,
    assignedTo: assignedTo || "Unassigned",
  });
});

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=task_details.xlsx"
    );

    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    console.error("Export Tasks Error:", error);
    res.status(500).json({ message: "Failed to export tasks report" });
  }
};

// @desc    Export users report
// @route   GET /api/reports/exports/users
// @access  Admin
const exportUsersReport = async (req, res) => {
  try {
    const users = await User.find().select("name email _id").lean();
    const userTasks = await Task.find().populate(
      "assignedTo",
      "name email _id"
    );

    const userTaskMap = {};
    users.forEach((user) => {
      userTaskMap[user._id] = {
        name: user.name,
        email: user.email,
        taskCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
      };
    });

    userTasks.forEach((task) => {
      if (task.assignedTo) {
        task.assignedTo.forEach((assignedUser) => {
          if (userTaskMap[assignedUser._id]) {
            userTaskMap[assignedUser._id].taskCount += 1;
            if (task.status === "Pending") {
              userTaskMap[assignedUser._id].pendingTasks += 1;
            } else if (task.status === "In Progress") {
              userTaskMap[assignedUser._id].inProgressTasks += 1;
            } else if (task.status === "Completed") {
              userTaskMap[assignedUser._id].completedTasks += 1;
            }
          }
        });
      }
    });

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Tasks Report");

    worksheet.columns = [
      { header: "User Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Total Assigned Tasks", key: "taskCount", width: 15 },
      { header: "Pending Tasks", key: "pendingTasks", width: 15 },
      { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
      { header: "Completed Tasks", key: "completedTasks", width: 20 },
    ];

    Object.values(userTaskMap).forEach((user) => {
      worksheet.addRow(user);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=users_report.xlsx`
    );

    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Failed to export users report" });
  }
};

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
