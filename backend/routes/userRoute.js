const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.route("/login").post(userController.loginUser);

router
  .route("/deleteMe")
  .delete(userController.protect, userController.deleteMe);

router.route("/forgotPassword").post(userController.forgotPassword);

router.route("/resetPassword/:token").put(userController.resetPassword);

router
  .route("/updatePassword")
  .patch(userController.protect, userController.updatePassword);

router
  .route("/updateMe")
  .patch(userController.protect, userController.updateMe);

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("admin"),
    userController.getAllUsers
  )
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.protect, userController.getUser)
  .put(userController.protect, userController.updateUser)
  .delete(
    userController.protect,
    userController.restrictTo("admin"),
    userController.deleteUser
  );

module.exports = router;
