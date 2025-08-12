import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import axiosInstance from "../../utils/axiosIntance";
import { API_PATHS } from "../../utils/apiPaths";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const [profileData, setProfileData] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);

      setProfileData(response?.data?.user);
console.log(response?.data?.user)
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <div className="flex justify-between w-full">
        <h2 className="text-transparent text-3xl font-bold bg-clip-text bg-gradient-to-r from-[#051d94] to-[#1de9b6] ">Task Management</h2>
        <div className="text-[11px] flex flex-col lg:flex-row text-center lg:text-left items-center gap-2" >Logged In: <span className="text-[11px] font-medium text-cyan-500 bg-cyan-50 border border-cyan-500/20 px-2 py-1 rounded">{profileData?.name}</span></div>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
