import React from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const testUser = {
  email: "beth@gmail.com",
  password: "123456000",
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    clearAlert,
    registerUser,
    loginUser,
  } = useAppContext();

  //toggle between login and register
  //if on login page, click on Register, then isMember is set to false
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    // console.log(e.target);

    //email: abc@abc.com
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target);

    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      clearAlert();
    }
    const currentUser = { name, email, password };
    if (isMember) {
      //login user
      //console.log("already a member");
      loginUser(currentUser);
    } else {
      //register user
      registerUser(currentUser);
    }
  };

  //if user is logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form action="" className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* {values.showAlert && <Alert />} */}
        {showAlert && <Alert />}

        {/* name input | required only when not a member */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password input */}

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            loginUser(testUser);
          }}
        >
          View Demo
        </button>

        <p>
          {/* on login page (isMember) >> Not a member yet + register */}
          {/* on register page (isMember) >> Already a member + Login */}
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
