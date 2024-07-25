import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/register.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtVerify } from "../middlewares/authenticate.middleware.js";

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

export default router;
