import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div className="">
        <img src={img} alt="not found" className="img" />
        <h3>Ooops! Page not found</h3>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
