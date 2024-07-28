import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar-local-path is missing !!!");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading file!!");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(201, user, "Successfully updated the Avatar !!"));
});

const updateCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;
  
    if (!coverImageLocalPath) {
      throw new ApiError(400, "Cover-Image-local-path is missing !!!");
    }
  
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  
    if (!coverImage.url) {
      throw new ApiError(400, "Error while uploading file!!");
    }
  
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          coverImage: coverImage.url,
        },
      },
      { new: true }
    ).select("-password -refreshToken");
  
    return res
      .status(200)
      .json(new ApiResponse(201, user, "Successfully updated the CoverImage !!"));
  });

export { updateAvatar, updateCoverImage };
