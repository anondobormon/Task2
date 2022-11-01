import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERROR,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

//Create product user and admin
export const createProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
        success: false,
        ...state,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        success: false,
        ...state,
      };
    case CREATE_PRODUCT_RESET:
      return {
        loading: false,
        success: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Create product user and admin
export const getAllProduct = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        success: false,
        ...state,
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        products: action.payload.products,
      };

    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        success: false,
        ...state,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Create product details
export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        ...state,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Update product
export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };

    case PRODUCT_UPDATE_SUCCESS:
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };

    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case PRODUCT_UPDATE_RESET:
    case PRODUCT_DELETE_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
