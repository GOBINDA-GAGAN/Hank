import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import RefreshSession from "../models/refreshSession.modal.js";

import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/createToken.js";

import { hashToken } from "../utils/tokenHash.js";

/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/

export const registerUser = async (req, res) => {
  try {
    // 1. Get input
    const { name, email, password } = req.body;

    // 2. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // 3. Normalize input
    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();

    // 4. Validate password
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // 5. Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 7. Create user
    // Never accept role from public registration
    const newUser = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    // 8. Return safe user data
    return res.status(201).json({
      message: "User registered successfully",

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    // Duplicate email race condition
    if (error.code === 11000) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

export const login = async (req, res) => {
  try {
    // 1. Get login data
    const { email, password } = req.body;

    // 2. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 3. Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // 4. Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    // 5. Check user
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 6. Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 7. Create access token
    const accessToken = createAccessToken({
      id: user._id,
      role: user.role,
    });

    // 8. Create refresh token
    const refreshToken = createRefreshToken({
      id: user._id,
    });

    // 9. Hash refresh token
    const tokenHash = hashToken(refreshToken);

    // 10. Store refresh session
    await RefreshSession.create({
      userId: user._id,
      tokenHash,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    // 11. Set access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    // 12. Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    // 13. Return safe user data
    return res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


/*
|--------------------------------------------------------------------------
| PROFILE / ME
|--------------------------------------------------------------------------
*/

export const profile = async (req, res) => {
  try {
    /*
     * Access token should be read from HttpOnly cookie.
     *
     * req.cookies.accessToken
     */

    const accessToken = req.cookies.accessToken;

    // 1. Check token
    if (!accessToken) {
      return res.status(401).json({
        message: "Access token not provided",
      });
    }

    // 2. Verify access token
    const decoded = verifyAccessToken(accessToken);

    // 3. Get user ID
    const userId = decoded.id;

    // 4. Find user
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 5. Return profile
    return res.status(200).json({
      message: "Profile retrieved successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);

    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};



// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    // 1. Get refresh token from HttpOnly cookie
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({
        message: "Refresh token not provided",
      });
    }

    // 2. Verify refresh token
    const decoded = verifyRefreshToken(oldRefreshToken);

    // 3. Hash received refresh token
    const oldTokenHash = hashToken(oldRefreshToken);

    // 4. Find refresh session
    const session = await RefreshSession.findOne({
      tokenHash: oldTokenHash,
    });

    // 5. Check session
    if (!session) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // 6. Check revoked session
    if (session.revokedAt) {
      return res.status(401).json({
        message: "Refresh session has been revoked",
      });
    }

    // 7. Check expiration
    if (session.expiresAt < new Date()) {
      session.revokedAt = new Date();
      await session.save();

      return res.status(401).json({
        message: "Refresh token expired",
      });
    }

    // 8. Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      session.revokedAt = new Date();
      await session.save();

      return res.status(401).json({
        message: "User not found",
      });
    }

    // 9. Revoke old refresh session
    session.revokedAt = new Date();
    await session.save();

    // 10. Create new access token
    const newAccessToken = createAccessToken({
      id: user._id,
      role: user.role,
    });

    // 11. Create new refresh token
    const newRefreshToken = createRefreshToken({
      id: user._id,
    });

    // 12. Hash new refresh token
    const newTokenHash = hashToken(newRefreshToken);

    // 13. Create new refresh session
    await RefreshSession.create({
      userId: user._id,
      tokenHash: newTokenHash,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    // 14. Set new access token cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    // 15. Set new refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/auth",
    });

    // 16. Response
    return res.status(200).json({
      message: "Token refreshed successfully",
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};


export const logout = async (req, res) => {
  try {
    // 1. Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    // 2. Revoke refresh session
    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);

      await RefreshSession.findOneAndUpdate(
        {
          tokenHash,
          revokedAt: null,
        },
        {
          revokedAt: new Date(),
        }
      );
    }

    // 3. Clear access token cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // 4. Clear refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/auth",
    });

    // 5. Response
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    // Even if DB operation fails, clear browser cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/auth",
    });

    return res.status(500).json({
      message: "Logout failed",
    });
  }
};