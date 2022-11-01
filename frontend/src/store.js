import { configureStore } from "@reduxjs/toolkit";
import {
  createProductReducer,
  getAllProduct,
  getProductDetailsReducer,
  updateProductReducer,
} from "./reducers/productReducer";
import {
  allUserReducer,
  deleteUserReducer,
  updateUserReducer,
  userDetails,
  userReducer,
} from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: allUserReducer,
    updateUser: updateUserReducer,
    userDetails: userDetails,
    deleteUser: deleteUserReducer,
    //PRODUCT REDUCERS
    createProduct: createProductReducer,
    allProducts: getAllProduct,
    productDetails: getProductDetailsReducer,
    updateProductStore: updateProductReducer,
  },
});

export default store;
