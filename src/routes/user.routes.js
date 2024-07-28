import { Router } from "express";
import {
  changeCurrentPassword,
  getChannelProfile,
  getCurrentUser,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
} from "../controllers/register.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtVerify } from "../middlewares/authenticate.middleware.js";
import {
  updateAvatar,
  updateCoverImage,
} from "../controllers/updateFile.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secure routes

router.route("/logout").post(jwtVerify, logoutUser);
router.route("/refresh-token").post(jwtVerify, refreshAccessToken);
router.route("/change-password").post(jwtVerify, changeCurrentPassword);
router.route("/current-user").get(jwtVerify, getCurrentUser);
router.route("/update-account").patch(jwtVerify, updateAccountDetails);

// routes for file update
router.route("/avatar").post(jwtVerify, upload.single("avatar"), updateAvatar);

router.route("/cover-image").post(jwtVerify, upload.single("coverImage"), updateCoverImage);


// channel routes
router.route("/c/:username").get(jwtVerify, getChannelProfile);
router.route("/watch-history").get(jwtVerify, getWatchHistory);


export default router;
