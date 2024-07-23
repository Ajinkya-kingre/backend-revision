import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (localFile) {
  try {
    if (!localFile) return null;
    //upload on the cloudinary
    const response = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });
    console.log("file is successfully uploaded on Cloudinary", response.url);
    //file has been uploaded successfully
    return response;
  } catch (error) {
    fs.unlinkSync(localFile); //removed the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export {uploadOnCloudinary}
