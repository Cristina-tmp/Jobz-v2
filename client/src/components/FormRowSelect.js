import React from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor="jobType" className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
        id=""
      >
        {list.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
