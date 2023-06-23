import React from "react";
import { useAppContext } from "../context/appContext";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState } from "react";
import { useMemo } from "react";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const {
    isLoading,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions,
  } = useAppContext();
  const handleSearch = (e) => {
    //if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    clearFilters();
  };

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 500);
    };
  };

  const debounceSearch = useMemo(
    () => debounce(),
    // eslint-disable-next-line
    []
  );

  return (
    <Wrapper>
      <form action="" className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={debounceSearch}
          />
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
