import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosIntance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUser from "../../components/Inputs/SelectUser";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import Model from "../../components/Model";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: null,
    assignedTo: [],
    todoChecklists: [],
    attachments: [],
  });
  // const [todoList, setTodoList] = useState("");
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklists: [],
      attachments: [],
    });
  };

  // Submit handle
  const handleSubmit = async () => {
    setError(null);
    if (!taskData.title.trim()) {
      setError("Title is Required.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is Required.");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due Date is Required.");
      return;
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task is not Assigned to any Member");
      return;
    }
    if (taskData.todoChecklists?.length === 0) {
      setError("Add Atleast One Task or Todo Checklist");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }
    createTask();
  };

  // Create Task
  const createTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklists?.map((item) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklists: todolist,
      });

      toast.success("Task Created Successfully!");
      clearData();
    } catch (error) {
      console.error("Error creating Task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklists?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklists || [];
        const matchedTask = prevTodoChecklist.find((task) => task.text == item);

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklists: todolist,
        }
      );

      toast.success("Task Updated Successfully!");
      clearData();
    } catch (error) {
      console.error("Error creating Task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Get Task by Id
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData((prevData) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item._id) || [],
          todoChecklists:
            taskInfo?.todoChecklists?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      console.error("Error Get Task:", error);
    }
  };

  // Delete Task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId))

      setOpenDeleteAlert(false);
      toast.success("Task Details Delete Successfully!");
      navigate("/admin/tasks")

      
    } catch (error) {
         console.error("Error Deleting Task:", error);
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }

    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="mt-5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
          <div className="form-data col-span-3 ">
            <div className="">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-xl font-medium">
                  {taskId ? "Update Task" : "Create Task"}
                </h2>
                {taskId && (
                  <button
                    className="flex items-center gap-1.2 text-[13px]  font-medium text-rose-500 bg-rose-50 rounded-sm px-2 py-1 border border-rose-100 hover:bg-rose-100
                  cursor-pointer hover:border-rose-300"
                    onClick={() => setOpenDeleteAlert(true)}
                  >
                    <LuTrash2 className="text-base" /> Delete
                  </button>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-slate-800"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="Create App UI"
                  className="form-input"
                  value={taskData?.title}
                  onChange={({ target }) =>
                    handleValueChange("title", target.value)
                  }
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-slate-800"
                >
                  Task Description
                </label>
                <textarea
                  placeholder="Describe Task"
                  className="form-input"
                  rows={4}
                  value={taskData?.description}
                  onChange={({ target }) =>
                    handleValueChange("description", target.value)
                  }
                ></textarea>
              </div>

              <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-6 md:col-span-4">
                  <label
                    htmlFor=""
                    className="text-xs font-medium text-slate-800"
                  >
                    {" "}
                    Priority
                  </label>
                  <SelectDropdown
                    options={PRIORITY_DATA}
                    value={taskData.priority}
                    onChange={(value) => handleValueChange("priority", value)}
                    placeholder="Select Priority"
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label
                    htmlFor=""
                    className="text-xs font-medium text-slate-800"
                  >
                    {" "}
                    Due Date
                  </label>
                  <input
                    type="date"
                    placeholder="Complete before"
                    className="form-input"
                    value={taskData?.dueDate || ""}
                    onChange={({ target }) =>
                      handleValueChange("dueDate", target.value)
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label
                    htmlFor=""
                    className="text-xs font-medium text-slate-800"
                  >
                    {" "}
                    Assign To
                  </label>
                  <SelectUser
                    selectedUsers={taskData.assignedTo}
                    setSelectedUsers={(value) =>
                      handleValueChange("assignedTo", value)
                    }
                    placeholder="Select Users"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-slate-800"
                >
                  TODO Checklists
                </label>
                <TodoListInput
                  todoList={taskData.todoChecklists || []} // <-- always array
                  setTodoList={(value) =>
                    handleValueChange("todoChecklists", value)
                  }
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-slate-800"
                >
                  Attachments
                </label>
                <AddAttachmentsInput
                  attachments={taskData.attachments || []}
                  setAttachments={(value) =>
                    handleValueChange("attachments", value)
                  }
                />
              </div>

              {error && <p className="text-xs text-red-600 mt-5 ">{error}</p>}

              <div className="flex justify-end mt-7 mb-10">
                <button
                  className="add-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {taskId ? "Update Task " : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Model
      isOpen={openDeleteAlert}
      onClose={()=>setOpenDeleteAlert(false)}
      title="Delete Task"
      >

        <DeleteAlert
        content="Are you sure you want to delete this task?"
        onDelete={()=>deleteTask()}
        />

      </Model>
    </DashboardLayout>
  );
};

export default CreateTask;
