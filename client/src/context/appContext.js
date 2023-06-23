import React from "react";
import { useEffect } from "react";
import { useReducer, useContext } from "react";
import reducer from "./reducers";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  DELETE_JOB_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./actions";
import axios from "axios";

//get user from local storage
// const user = localStorage.getItem("user");
// const token = localStorage.getItem("token");
// const userLocation = localStorage.getItem("location");

//Global state
const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  userLocation: "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //   const [state, setState] = useState(initialState);

  const [state, dispatch] = useReducer(reducer, initialState);

  //custom instance
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  //interceptors request
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers.Authorization = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };

  //interceptors response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("auth error");
      }
      return Promise.reject(error);
    }
  );

  //reset alert after 3 seconds

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //store user in local storage
  // const addUserToLocalStorage = ({ user, token, location }) => {
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("location", location);
  // };

  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("location");
  // };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      //post request to register
      const response = await axios.post("/api/v1/auth/register", currentUser);
      //console.log(response);
      //get token, user, location from response
      const { user, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, location },
      });
      //add user to local storage
    } catch (error) {
      // console.log(error.response?.data?.msg);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response?.data?.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      const { user, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location },
      });
      //add user to local storage
    } catch (error) {
      // console.log(error.response?.data?.msg);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response?.data?.msg },
      });
    }
    clearAlert();
  };

  //handle change
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  //Clear values
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  //toggle sidebar

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  //logout user
  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
    // removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("auth/update", currentUser);
      const { user, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });
      //console.log(data);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response?.data?.msg },
      });
      //console.log(error);
    }
    clearAlert();
  };

  //create job
  const createJob = async (job) => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      //console.log(data);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response?.data?.msg },
      });
      //console.log(error);
    }
    clearAlert();
  };

  const getAllJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url += `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      //console.log(error.response?.data?.msg);
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = async (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async (id) => {
    dispatch({ type: EDIT_JOB_BEGIN, payload: { id } });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response?.data?.msg },
      });
    }
    clearAlert();

    // console.log("edit job");
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getAllJobs();
    } catch (error) {
      //  console.log(error.response?.data?.msg);
      // logoutUser();
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response?.data?.msg },
      });
    }
    clearAlert();

    // console.log("delete job");
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch.get("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      // console.log(error.response?.data?.msg);
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch.get("/auth/getCurrentUser");
      const { user, location } = data;
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getAllJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        getCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//set up custom hook so we dont have to use useContext to access appContext everytime

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
