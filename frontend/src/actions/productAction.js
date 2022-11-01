import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERROR,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

export const createProduct = (newData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/create`, newData, config);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all project
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(`/api/products`);

    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get a product
export const getAProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update product
export const updateProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/product/${id}`, formData, config);

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//dELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`/api/product/${id}`);

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Add member
// export const enrollProject = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: ENROLL_REQUEST,
//     });

//     const { data } = await axios.put(`/api/project/enroll/${id}`);

//     dispatch({ type: ENROLL_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: ENROLL_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

//Clear all error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
