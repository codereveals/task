import React from "react";
import { IoIosClose } from "react-icons/io";

const Model = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return;
  return (
    <div className="fixed top-0 right-0 z-50 left-0 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Model Content  */}
        <div className="relative bg-white rounded-lg shadow-sm ">
          {/* Header  */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-100">
            <h2 className="text-lg font-medium text-primary">
              {title}
            </h2>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-primary hover:text-white rounded dark:text-white p-2 cursor-pointer"
              onClick={onClose}
            >
              <IoIosClose className="text-2xl dark:text-white" />{" "}
            </button>
          </div>
          {/* Model Body ? */}

          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Model;
