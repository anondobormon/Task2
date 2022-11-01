import axios from "axios";
import {
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  CLEAR_ERROR,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";

//Register a user
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/register", formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//login a user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/login",
      { email, password },
      config
    );
    console.log(data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create User Account
export const createUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    await axios.post("/api/create-user", user, config);

    dispatch({
      type: CREATE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Logout user
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/logout");

    dispatch({ type: LOGOUT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/me");

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get all users --Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_USER_REQUEST,
    });
    const { data } = await axios.get("/api/users");

    dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete user--Admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(`/api/remove/${id}`, config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get userDetails
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update user Role
export const updateUserRole = (id, role) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    const { data } = await axios.put(`/api/update/user/${id}`, role);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// //Logout user
// export const updateUser = (id, newData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_USER_REQUEST });

//     const { data } = await axios.put(
//       `/api/project/update/member/${id}`,
//       newData
//     );

//     dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_USER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// //Logout user
// export const logout = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get("/api/project/logout");

//     dispatch({ type: LOGOUT_SUCCESS, payload: data.user });
//   } catch (error) {
//     dispatch({
//       type: LOGOUT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

//Clear all error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
