import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Link, Outlet } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar } from "../../components/index";

const SharedLayout = () => {
  return (
    <Wrapper>
      {/* <nav>
        <Link to="add-job">add job</Link>
        <Link to="all-jobs">all jobs</Link>
      </nav> */}
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div className="">
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
