
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";

import Ticket from "../models/ticket.modal.js";
import Conversation from "../models/conversation.modal.js";
import ChatMessage from "../models/chatMessage.modal.js";
import { analyzeTicket } from "../services/ai.service.js";

const humanRequestPattern =
  /\b(speak to|talk to|connect me to|human support|live agent|real person|human agent)\b/i;

const criticalIssuePattern =
  /\b(security breach|account compromised|data leak|ransomware|production outage)\b/i;

export const createTicket = async (req, res) => {
  let conversation;
  let ticket;

  try {
    // 1. Authentication
    const employee = req.user?._id;

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Validate request
    const issue =
      typeof req.body?.issue === "string"
        ? req.body.issue.trim()
        : "";

    const { conversationId } = req.body ?? {};

    if (!issue) {
      return res.status(400).json({
        success: false,
        message: "Issue is required",
      });
    }

    // 3. Find or create conversation
    if (conversationId) {
      if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid conversation ID",
        });
      }

      conversation = await Conversation.findOne({
        _id: conversationId,
        employee,
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }
    } else {
      conversation = await Conversation.create({
        employee,
        ticket: null,
      });
    }

    // 4. Prevent duplicate ticket creation
    if (conversation.ticket) {
      return res.status(409).json({
        success: false,
        message: "Ticket already exists for this conversation",
        data: {
          conversationId: conversation._id,
          ticketId: conversation.ticket,
        },
      });
    }

    // 5. Avoid duplicate employee messages
    const lastMessage = await ChatMessage.findOne({
      conversation: conversation._id,
    }).sort({ createdAt: -1 });

    if (
      lastMessage?.senderType !== "employee" ||
      lastMessage.message?.trim() !== issue
    ) {
      await ChatMessage.create({
        conversation: conversation._id,
        senderType: "employee",
        message: issue,
      });
    }

    // 6. Analyze issue with Groq
    let ai;

    try {
      ai = await analyzeTicket({ issue });
    } catch (error) {
      console.error("Groq analysis failed:", error.message);

      await ChatMessage.create({
        conversation: conversation._id,
        senderType: "ai",
        message:
          "AI analysis is temporarily unavailable. " +
          "Your issue has been saved. Please try again shortly.",
      });

      return res.status(503).json({
        success: false,
        message: "AI analysis unavailable",
        data: {
          conversationId: conversation._id,
        },
      });
    }

    // 7. Determine escalation
    const confidence = Number(ai.confidence);

    const explicitHumanRequest =
      humanRequestPattern.test(issue);

    const criticalIssue =
      criticalIssuePattern.test(issue);

    const lowConfidence =
      !Number.isFinite(confidence) || confidence < 0.7;

    const needsHuman =
      ai.decision === "human-review" ||
      explicitHumanRequest ||
      criticalIssue ||
      lowConfidence;

    const escalationReason = needsHuman
      ? ai.escalationReason?.trim() ||
        (explicitHumanRequest
          ? "Employee requested a human agent."
          : criticalIssue
            ? "Potential security or critical incident."
            : "AI cannot confidently resolve this issue.")
      : "";

    const suggestedSolution =
      typeof ai.suggestedSolution === "string"
        ? ai.suggestedSolution.trim()
        : "";

    // 8. Create ticket
    ticket = await Ticket.create({
      ticketId: `TKT-${randomUUID()}`,
      employee,
      issue,
      description: ai.description || issue,
      intent: ai.intent || "possible_support",
      category: ai.category || "General",
      department: ai.department || "Support",
      tokens: Array.isArray(ai.tokens) ? ai.tokens : [],
      priority: ai.priority || "medium",

      aiAnalysis: {
        confidence: Number.isFinite(confidence)
          ? Math.max(0, Math.min(1, confidence))
          : 0.5,
        suggestedSolution,
        decision: needsHuman
          ? "human-review"
          : "suggested",
        escalationReason,
      },

      status: needsHuman ? "escalated" : "open",
      analysisStatus: "completed",
    });

    // 9. Link ticket with conversation
    conversation.ticket = ticket._id;
    await conversation.save();

    // 10. Save AI reply
    const aiReply = needsHuman
      ? `Ticket ${ticket.ticketId} requires human review. ` +
        "A support agent will need to investigate."
      : suggestedSolution ||
        `Ticket ${ticket.ticketId} has been created. ` +
        "Please describe any additional symptoms.";

    await ChatMessage.create({
      conversation: conversation._id,
      senderType: "ai",
      message: aiReply,
    });

    // 11. Return conversation
    const messages = await ChatMessage.find({
      conversation: conversation._id,
    }).sort({ createdAt: 1 });

    return res.status(201).json({
      success: true,
      message: needsHuman
        ? "Ticket created and escalated for human review"
        : "Ticket created with AI assistance",

      data: {
        conversationId: conversation._id,
        ticket,
        messages,
        aiReply,
        escalationRequired: needsHuman,
      },
    });
  } catch (error) {
    console.error("Create ticket error:", error);

    return res.status(500).json({
      success: false,
      message: ticket
        ? "Ticket created but follow-up processing failed"
        : "Failed to create ticket",
      ...(ticket && {
        data: {
          ticketId: ticket.ticketId,
          conversationId: conversation?._id,
        },
      }),
    });
  }
};


const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeStatus = (status) => {
  if (!status) return "Open";
  return status;
};

export const getAllSupportItems = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 5)
    );

    const type = req.query.type || "all";
    const search = String(req.query.search || "").trim();
    const status = req.query.status || "All";
    const priority = req.query.priority || "All";
    const department = req.query.department || "All";

    if (!["all", "ticket", "conversation"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "type must be all, ticket, or conversation.",
      });
    }

    const ownership = {
      employee: userId,
    };

    // Assumes these fields exist on your respective schemas.
    const ticketFilter = { ...ownership };
    const conversationFilter = { ...ownership };

    if (status !== "All") {
      ticketFilter.status = status;
      conversationFilter.status = status;
    }

    if (priority !== "All") {
      ticketFilter.priority = priority;
      conversationFilter.priority = priority;
    }

    if (department !== "All") {
      ticketFilter.department = department;
      conversationFilter.department = department;
    }

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");

      ticketFilter.$or = [
        { ticketId: regex },
        { title: regex },
        { issue: regex },
      ];

      conversationFilter.$or = [
        { title: regex },
        { issue: regex },
      ];
    }

    const includeTickets = type === "all" || type === "ticket";
    const includeConversations =
      type === "all" || type === "conversation";

    const [tickets, conversations] = await Promise.all([
      includeTickets
        ? Ticket.find(ticketFilter)
            .sort({ updatedAt: -1 })
            .lean()
        : [],

      includeConversations
        ? Conversation.find(conversationFilter)
            .sort({ updatedAt: -1 })
            .lean()
        : [],
    ]);

    const ticketItems = tickets.map((ticket) => ({
      id: ticket.ticketId || String(ticket._id),
      _id: String(ticket._id),
      type: "ticket",
      department: ticket.department || "Support",
      issue:
        ticket.title ||
        ticket.issue ||
        "Support request",
      priority: ticket.priority || "Medium",
      ai: ticket.aiStatus || "Analyzing",
      status: normalizeStatus(ticket.status),
      created: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      conversationId: ticket.conversation
        ? String(ticket.conversation)
        : null,
    }));

    // Exclude conversations that already have a linked ticket
    // from the combined list to avoid duplicate rows.
    const ticketConversationIds = new Set(
      tickets
        .map((ticket) => ticket.conversation?.toString())
        .filter(Boolean)
    );

    const conversationItems = conversations
      .filter(
        (conversation) =>
          !ticketConversationIds.has(String(conversation._id))
      )
      .map((conversation) => ({
        id: `CHAT-${String(conversation._id).slice(-6)}`,
        _id: String(conversation._id),
        type: "conversation",
        department: conversation.department || "Support",
        issue:
          conversation.title ||
          conversation.issue ||
          "Support conversation",
        priority: conversation.priority || "Medium",
        ai: conversation.aiStatus || "Analyzing",
        status: normalizeStatus(conversation.status),
        created: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        conversationId: String(conversation._id),
      }));

    const items = [...ticketItems, ...conversationItems].sort(
      (a, b) =>
        new Date(b.updatedAt || b.created || 0).getTime() -
        new Date(a.updatedAt || a.created || 0).getTime()
    );

    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;

    return res.status(200).json({
      success: true,
      message: "Support items fetched successfully.",
      data: {
        items: items.slice(startIndex, startIndex + limit),
        stats: {
          totalTickets: ticketItems.length,
          openTickets: items.filter(
            (item) =>
              item.status === "Open" ||
              item.status === "In Progress"
          ).length,
          aiResolved: items.filter(
            (item) => item.ai === "Resolved"
          ).length,
          humanAction: items.filter(
            (item) => item.ai === "Human"
          ).length,
        },
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
