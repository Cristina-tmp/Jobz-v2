import React from "react";
import Jobs from "./Jobs";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Alert from "./Alert";

const JobsContainer = () => {
  const {
    getAllJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getAllJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs To Display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found{" "}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Jobs key={job._id} {...job} />;
        })}
      </div>

      {/* pag btns */}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
