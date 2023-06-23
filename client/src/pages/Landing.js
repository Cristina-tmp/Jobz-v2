import React from "react";
import main from "../assets/images/main.svg";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>

        <div className="container page">
          <div className="info">
            <h1>
              Job <span>tracking</span> app
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              distinctio sequi quaerat neque incidunt voluptatum recusandae,
              cumque animi iure quos.
            </p>
            <Link to="/register" className="btn btn-hero">
              Get Started
            </Link>
          </div>

          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
