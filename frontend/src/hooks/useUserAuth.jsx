import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const useUserAuth = (requireAdmin = false) => {
  const { user, loading, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      clearUser();
      navigate("/login");
      return;
    }

    // Role check for admin routes
    if (requireAdmin && user.role !== "admin") {
      navigate("/dashboard"); // Redirect non-admins to user dashboard
    }
  }, [user, loading, clearUser, navigate, requireAdmin]);
};