import React, { useState } from "react";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState(""); // always a string

  const handleAddOption = () => {
    if ((option ?? "").trim()) { // guard against undefined
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={item}
          className="flex mt-4 justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3"
        >
          <p className="text-xs text-black ">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>{" "}
            {item}
          </p>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-6 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 rounded-md px-3 py-2"
          value={option ?? ""} // always a string
          onChange={e => setOption(e.target.value)}
        />
        <button onClick={handleAddOption} className="card-btn text-nowrap">
          <HiPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
