
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    // Ticket information
    ticketId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Employee input
    issue: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // AI-generated classification
    intent: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    tokens: {
      type: [String],
      default: [],
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    // AI analysis
    aiAnalysis: {
      confidence: {
        type: Number,
        min: 0,
        max: 1,
      },

      suggestedSolution: {
        type: String,
        trim: true,
      },

      decision: {
        type: String,
        enum: [
          "pending",
          "suggested",
          "human-review",
          "approved",
          "auto-resolved",
        ],
        default: "pending",
      },

      escalationReason: {
        type: String,
        trim: true,
      },
    },

    // Human support
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    resolution: {
      type: String,
      trim: true,
    },

    // Ticket lifecycle
    status: {
      type: String,
      enum: [
        "open",
        "in-progress",
        "waiting",
        "escalated",
        "resolved",
        "closed",
      ],
      default: "open",
    },

    // AI processing state
    analysisStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
