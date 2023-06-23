import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { useAppContext } from "../context/appContext";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Logo from "./Logo";
const Navbar = () => {
  const { toggleSidebar, logoutUser, user } = useAppContext();
  const [showLogOut, setShowLogOut] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className="">
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogOut(!showLogOut)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogOut ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              log out
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
