import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosIntance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const Signup = () => {
  // States 
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const { updateUser } = useContext(UserContext); // ✅ Corrected here
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // Handle Register 

  const handleRegister = async (e) => {
    e.preventDefault();

    let profileImageUrl = ""

    if (!validateEmail(email)) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");

    // Signup page API Call 

    try {

      // Upload Image 

      if(profilePic){
        const imageUploadRes= await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullname,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      })

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data); // ✅ Corrected here

        if (role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/user/dashboard", { replace: true });
        }
      }

      alert(email)
    } catch (error) {
      if (error.response?.data) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }

  };

  return (
    <AuthLayout>
      <div className=" h-3/4  md:h-full w-full flex flex-col justify-center items-center mx-auto">
        <h3 className="text-xl font-bold">Create An Account</h3>
        <p>Join Us Today entering your details</p>

        <form onSubmit={handleRegister} className="w-full mt-6">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <Input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            label="Full Name"
            placeholder="John Doe"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email Address"
            placeholder="john@example.com"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Password"
            placeholder="Min. 6 characters"
          />
          <Input
            value={adminInviteToken}
            onChange={(e) => setAdminInviteToken(e.target.value)}
            type="text"
            label="Admin Invite Token"
            placeholder="6 Digit Token"
          />

          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}

          <button
            type="submit"
            className="w-full h-12 bg-primary text-white rounded mt-4 hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Signup
          </button>

          <p className="text-[13px] text-slate-600 mt-4 text-end">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
