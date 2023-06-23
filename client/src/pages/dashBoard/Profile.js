import React from "react";
import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert } from "../../components/index.js";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, clearAlert } =
    useAppContext();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);
  const [lastName, setLastName] = useState(user.lastName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !location || !lastName) {
      displayAlert();
      clearAlert();
      return;
    }
    updateUser({ name, email, location, lastName });
  };

  return (
    <Wrapper>
      <form action="" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* update name */}
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            name="lastName"
            value={lastName}
            labelText="last name"
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
