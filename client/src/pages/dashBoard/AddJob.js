import React from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert, FormRowSelect } from "../../components/index.js";
import { useAppContext } from "../../context/appContext";

const AddJob = () => {
  const {
    isLoading,
    showAlert,
    company,
    position,
    isEditing,
    jobType,
    jobTypeOptions,
    jobLocation,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    displayAlert,
    clearAlert,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      clearAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form action="">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            labelText="Position"
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            labelText="Company"
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <FormRowSelect
            name="status"
            labelText="Status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>

            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
