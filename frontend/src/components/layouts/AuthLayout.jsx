
import { auth_Image } from "../../assets/images";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="hidden md:block md:w-[60%] h-screen bg-[#00051e] ">
        <div className="h-screen flex items-center">
          <img
            src={auth_Image}
            alt="Auth Background"
            className="w-full "
          />
        </div>

      </div>
      <div className="w-screen h-screen md:w-[40%] px-12 pt-8 pb-12">
        <h2 className="font-semibold text-center">Task Management</h2>
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;
