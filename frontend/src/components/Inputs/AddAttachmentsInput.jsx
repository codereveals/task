import React, { useState } from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { LuPaperclip } from "react-icons/lu";
const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState(""); // always a string

  //   Handle add Option ÷
  const handleAddOption = () => {
    if ((option ?? "").trim()) {
      // guard against undefined
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  // Delete an attachment
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div  className="flex mt-4 justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3"
         key={item}>
          <div className="flex flex-1 items-center gap-3 border border-gray-100">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black">{item}</p>
          </div>
          <button className="cursor-pointer" onClick={() => handleAddOption(index)}>
            <HiOutlineTrash className="text-red-500 text-lg" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3 py-2">
          <LuPaperclip  className="text-gray-400"/>
          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 rounded-md px-3 py-2"
          />
          <button onClick={handleAddOption} className="card-btn text-nowrap">
            <HiPlus className="text-lg" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
