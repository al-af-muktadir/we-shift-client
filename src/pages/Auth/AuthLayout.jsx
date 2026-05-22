import { Outlet } from "react-router";
import logo from "../../../public/image.png";
import authpic from "../../../../../Zap-shift-Resources/assets/authImage.png";
const AuthLayout = () => {
  return (
    <div>
      <img className="w-36" src={logo}></img>
      <div className=" max-w-7xl mx-auto mr-20 mt-10 flex">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>

        <div className="flex-1  mt-20">
          <img className="" src={authpic}></img>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
