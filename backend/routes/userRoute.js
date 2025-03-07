const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("admin"),
    userController.getAllUsers
  )
  .post(userController.createUser);

router.route("/login").post(userController.loginUser);

router
  .route("/:id")
  .get(userController.protect, userController.getUser)
  .put(userController.protect, userController.updateUser)
  .delete(
    userController.protect,
    userController.restrictTo("admin"),
    userController.deleteUser
  );

router.route("/forgotPassword").post(userController.forgotPassword);

router.route("/resetPassword/:token").put(userController.resetPassword);

router
  .route("/updatePassword")
  .patch(userController.protect, userController.updatePassword);

router
  .route("/updateMe")
  .patch(userController.protect, userController.updateMe);

module.exports = router;
