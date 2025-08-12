import React from "react";
import Progess from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";
import Progress from "../Progress";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklists,
  onClick,
}) => {
  // Status Color generate

  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/20";

      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";

      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  // Priority Color

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/20";

      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/20";

      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  return (
    <div
      className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer "
      onClick={onClick}
    >
      <div className="flex items-end gap-4 px-3">
        <div
          className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-1 rounded`}
        >
          {status}
        </div>
        <div
          className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-1 rounded`}
        >
          {priority}
        </div>
      </div>

      <div
        className={`px-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-500"
            : status === "Completed"
            ? "border-indigo-500"
            : "border-violet-500"
        }`}
      >
        <h2 className="font-medium text-sm text-gray-800 mt-4 line-clamp-2">{title}</h2>
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]" >{description}</p>
        <p className="text-[13px] text-gray-700/80 font-medium mt-2 mb-2 leading-[18px] ">
          Task Done:{" "}
          <span className="font-semibold text-gray-700">
            {completedTodoCount}/{todoChecklists.length || 0}
          </span>
        </p>
        <Progress />
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between my-1">
<div className="">
          <label htmlFor="" className="text-xs text-gray-500">Start Date</label>
          <p className="text-[13px] font-medium text-gray-900">{moment(createdAt).format("Do MMM YYYY")}</p>
        </div>
        <div>
          <label htmlFor="" className="text-xs text-gray-500">Due Date</label>
          <p className="text-[13px] font-medium text-gray-900">{moment(dueDate).format("Do MMM YYYY")}</p>
        </div>
        </div>
        
      </div>

      <div className="flex justify-between  items-center mt-4 px-4">
        <AvatarGroup avatars={assignedTo || []} />
        {attachmentCount > 0 && (
          <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg">
            <LuPaperclip className="text-teal-500"/>
            <span className="text-xs text-gray-900">{attachmentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
