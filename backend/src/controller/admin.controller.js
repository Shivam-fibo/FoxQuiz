import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../model/admin.model.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshToken = async (AdminID) => {
    try {
        const admin = await Admin.findById(AdminID);
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        // Generate access and refresh tokens
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, newRefreshToken: refreshToken };
    } catch (error) {
        console.error('Token Generation Error:', error);
        throw new ApiError(500, "Something went wrong");
    }
};

const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedEmail = await Admin.findOne({ email });
    if (existedEmail) {
        throw new ApiError(409, "Email already exists");
    }

    const admin = await Admin.create({ email, password });

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    return res.status(201).json(new ApiResponse(201, createdAdmin, "Admin registered successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);
    // if (!isPasswordValid) {
    //     throw new ApiError(401, "Incorrect password");
    // }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id);
    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    const options = { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { admin: loggedInAdmin, accessToken, refreshToken }, "Admin logged in successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const admin = await Admin.findById(decodedToken?._id);

        if (!admin || incomingRefreshToken !== admin.refreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(admin._id);
        const options = { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    } catch (error) {
        console.error('Refresh Token Error:', error);
        throw new ApiError(401, "Unauthorized");
    }
});

export { registerAdmin, loginAdmin, refreshAccessToken };
