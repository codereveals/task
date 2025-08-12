import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosIntance";

const ProfileData = () => {
  const [profileData, setProfileData] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
 
    setProfileData(response.data?.user)

    console.log(response.data.user)
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (!profileData) {
    return (
      <DashboardLayout activeMenu="Profile">
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center text-center">
          <img
            src={profileData.profileImageUrl}
            alt={profileData.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />
          <h2 className="mt-4 text-2xl font-bold">{profileData.name}</h2>
          <p className="text-gray-500 py-3">Role:  <span className="text-[11px] font-medium text-cyan-500 bg-cyan-50 border border-cyan-500/20 px-2 py-.5 rounded">{profileData.role}</span> </p>
         {
           (<p className="text-gray-500  py-2">Department: <span className=" gap-2 bg-rose-50 px-2.5 py-.5 border border-rose-500/20 text-[11px] rounded">{profileData.department}</span> </p>)
         }
          
        </div>

        {/* User Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Email" value={profileData.email} />
          <InfoItem label="Phone" value={profileData.phone} />
          <InfoItem label="Address" value={profileData.address} />
          <InfoItem label="Date of Birth" value={profileData.dob} />
          <InfoItem label="Father's Name" value={profileData.fatherName} />
          <InfoItem label="Mother's Name" value={profileData.motherName} />
          <InfoItem label="Role" value={profileData.role} />
          <InfoItem label="Joined" value={new Date(profileData.createdAt).toLocaleDateString()} />
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Bio</h3>
          <p className="text-gray-700">{profileData.bio}</p>
        </div>

        {/* Comment */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Comment</h3>
          <p className="text-gray-700 italic">"{profileData.comment}"</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Reusable Info Item
const InfoItem = ({ label, value }) => (
  <div className="p-4 border border-green-100 rounded  shadow bg-teal-50">
    <p className="text-xs text-gray-500 uppercase">{label}</p>
    <p className="text-gray-800 font-medium">{value || "N/A"}</p>
  </div>
);

export default ProfileData;
