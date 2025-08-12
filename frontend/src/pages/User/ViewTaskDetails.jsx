import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosIntance";
import { API_PATHS } from "../../utils/apiPaths";
import AvatarGroup from "../../components/AvatarGroup";
import moment from "moment";
import {
  LuSquareArrowOutDownRight,
  LuSquareArrowOutUpRight,
} from "react-icons/lu";

const ViewTaskDetails = () => {
  const [tasks, setTasks] = useState(null);
  const { id } = useParams();

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/20";

      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";

      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  // get Task Detail by Id

  const getTaskDetailsById = async (taskId) => {
  try {
    const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
    if (response.data) {
      setTasks(response.data);
    }
  } catch (error) {
    console.log("Error Fetching Task Details", error);
  }
};

  // Update Todo Checklist

  // const updateTodoChecklist = async (index) => {
  //    const todoChecklists = [...tasks?.todoChecklists];
  //     const taskId = id;

  //     if (todoChecklists && todoChecklists[index]) {
  //       todoChecklists[index].completed = !todoChecklists[index].completed;
  //     }
  //   try {
     
  //     const response = await axiosInstance.put(
  //       API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
  //       { todoChecklists }
  //     );
  //     if (response.status === 200) {
  //       setTasks(response.data?.tasks || tasks);
  //     } else {
  //       todoChecklists[index].completed = !todoChecklists[index].completed;
  //     }
  //   } catch (error) {
  //     todoChecklists[index].completed = !todoChecklists[index].completed;
  //   }
  // };



  const updateTodoChecklist = async (index) => {
     const todoChecklists = tasks?.todoChecklists.map((item, idx) =>
      idx === index ? { ...item, completed: !item.completed } : item
    );
    const taskId = id;
  try {

    const response = await axiosInstance.put(
      API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
      { todoChecklists }
    );
    if (response.status === 200) {
      setTasks(response.data?.tasks || { ...tasks, todoChecklists });
    }
  } catch (error) {
    // Optionally show error message
    todoChecklists[index].completed = !todoChecklists[index].completed;
  }
};

  // Handle Attachement link

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };


useEffect(() => {
  if (id) {
    getTaskDetailsById(id); // now uses correct id
  }
  return () => {};
}, [id]);

  return (
    <DashboardLayout activeMenu={"Task Details"}>
      <div className="mt-5">
        {tasks && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-3">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-xl font-medium">
                  {tasks?.title}
                </h2>
                <div
                  className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(
                    tasks?.status
                  )} px-4 py-0.5 rounded`}
                >
                  {tasks?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={tasks?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={tasks?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      tasks?.dueDate
                        ? moment(tasks?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  
                  <label className="text-sm font-medium text-slate-500">Assigned To</label>
                  <AvatarGroup
                    avatars={
                      tasks?.assignedTo?.map((item) => item?.profileImageUrl) ||
                      []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="text-sm font-medium text-slate-500">
                  Todo Checklist
                </label>
                {tasks?.todoChecklists?.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item?.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>

              {tasks?.attachments.length > 0 && (
                <div className="mt-2">
                  <label className="text-sm font-medium text-slate-500">
                    Attachments
                  </label>
                  {tasks?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className="text-sm font-medium text-slate-500">{label}</label>
      <p className="text-[12px] md:text-[14px] font-medium text-gray-700 mt-0.5">
        {value}
      </p>
    </>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-4">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
      />
      <p className="text-[13px] text-gray-800">{text}</p>
    </div>
  );
};

const Attachment = ({ link, index, onClick }) => {
  return (
    <>
      <div
        className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-3 cursor-pointer"
        onClick={onClick}
      >
    
        <div className="flex-1 flex items-center gap-3 border border-gray-100">
          <span className="text-xs text-gray-400 font-medium mr-2">
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>
          <p className="text-black text-xs ">{link}</p>
        </div>
        <div>
          <LuSquareArrowOutUpRight className="text-gray-400" />
        </div>
      </div>
    </>
  );
};
