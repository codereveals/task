import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosIntance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast"; // Add this if you use toast

const UpdateProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImageUrl: "",
    phone: "",
    address: "",
    designation: "",
    department: "",
    fatherName: "",
    motherName: "",
    dob: "",
    bio: "",
    comment: "",
    avatar: "",
    password: "",
  });

  // Fetch previous profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        if (response.data?.user) {
          setFormData({
            ...formData,
            ...response.data.user,
            password: "", // Don't prefill password
          });
          setProfilePic(response.data.user.profileImageUrl || null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profileImageUrl = formData.profileImageUrl;
      if (profilePic && profilePic !== formData.profileImageUrl) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }
      const updatedData = { ...formData, profileImageUrl };
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, updatedData);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  return (
    <DashboardLayout activeMenu="Profile Update">
        <div className="my-3">
            <h2 className="py-3 font-semibold text-2xl font-gray-500 text-center">Update Profile</h2>
        </div>
         {/* Show profile image preview */}
    <div className="flex justify-center mb-4 ">
      <img
        src={profilePic || formData.profileImageUrl || "https://via.placeholder.com/120"}
        alt="Profile"
        className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
      />
    </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
            <input
              type="text"
              name="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Father's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Mother's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="form-input"
            ></textarea>
          </div>

          {/* Comment */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="3"
              className="form-input"
            ></textarea>
          </div>

          {/* Avatar URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Submit */}
       <div class="flex justify-end mt-7 mb-10"><button class="add-btn">Update Profile</button></div>

        </form>
    </DashboardLayout>
  );
};

export default UpdateProfile;
