import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import jwt from 'jsonwebtoken';

export const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Find user by ID from decoded token, and exclude password & refreshToken fields
    const user = await User.findById(decodedToken.userId).select("-password -refreshToken");
    
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // Attach user data to request for access in next middleware or route handler
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
