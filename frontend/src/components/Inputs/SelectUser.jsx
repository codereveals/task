import React, { useEffect, useState } from "react";
import { LuChevronDown, LuUser } from "react-icons/lu";
import axiosInstance from "../../utils/axiosIntance";
import { API_PATHS } from "../../utils/apiPaths";
import Model from "../Model";
import AvatarGroup from "../AvatarGroup";

const SelectUser = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async (option) => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error Fetching Users: ", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModelOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length > 0) {
      setTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);
  return (
    <div className="relative w-full space-y-2">
      {selectedUserAvatars.length === 0 && (
        <button
          className="card-btn mt-2.5"
          onClick={() => setIsModelOpen(true)}
        >
          <LuUser className="text-xs" /> Add Member
        </button>
      )}

      {/* Selected Avatar Group  */}
       {selectedUserAvatars.length > 0 && (
       <div className="cursor-pointer mt-3" onClick={()=> setIsModelOpen(true)}>
        <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
       </div>
      )}


      <Model
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border-b border-gray-100"
            >
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-md outline-none"
              />
            </div>
          ))}
        </div>

        {/* Footer Model  */}

        <div className="flex justify-end gap-4 pt-4">
          <button className="card-btn" onClick={() => setIsModelOpen(false)}>
            Cancel{" "}
          </button>
          <button className="card-btn-fill" onClick={handleAssign}>
            Assigned User{" "}
          </button>
        </div>
      </Model>
    </div>
  );
};

export default SelectUser;
