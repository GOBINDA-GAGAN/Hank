import mongoose from "mongoose";

const refreshSessionSchema = new mongoose.Schema(
  {
    // User who owns this refresh session
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // SHA-256 hash of the refresh token
    // Never store the raw refresh token in MongoDB
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    // When this refresh token expires
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    // Set when the session is logged out/revoked
    revokedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const RefreshSession = mongoose.model(
  "RefreshSession",
  refreshSessionSchema
);

export default RefreshSession;