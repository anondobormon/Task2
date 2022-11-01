const {
  registerUser,
  loginUser,
  updateUser,
  getLoggedInUser,
  getAllUser,
  getUserDetails,
  logoutUser,
  deleteUser,
  createUserByAdmin,
} = require("../controller/userController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = require("express").Router();

//Register a user
router.post("/register", registerUser);

//Login a user
router.post("/login", loginUser);

//Update user role
router.put(
  "/update/user/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  updateUser
);

//get/read all user
router.get("/users", isAuthenticatedUser, getAllUser);

//Delete a user only access for admin
router.delete(
  "/remove/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  deleteUser
);

//get a user
router.get("/user/:id", isAuthenticatedUser, getUserDetails);

//create user by admin
router.post(
  "/create-user",
  isAuthenticatedUser,
  authorizedRole("admin"),
  createUserByAdmin
);

//get logged in user
router.get("/me", isAuthenticatedUser, getLoggedInUser);

//Logout user
router.get("/logout", isAuthenticatedUser, logoutUser);

module.exports = router;
