
import mongoose from "mongoose";

import Conversation from "../models/conversation.modal.js";
import ChatMessage from "../models/chatMessage.modal.js";
import { understandMessage } from "../services/ai.service.js";

const isSimpleGreeting = (message) =>
  /^(hi+|hello+|hey+|good morning|good afternoon|good evening)(?:\s+(?:hank|there|team|bot))?[!.?]*$/i.test(
    message.trim()
  );

export const sendMessage = async (req, res) => {
  try {
    // 1. Validate authentication
    const employee = req.user?._id;

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // 2. Validate message
    const message =
      typeof req.body?.message === "string"
        ? req.body.message.trim()
        : "";

    const { conversationId } = req.body ?? {};

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    // 3. Find or create conversation
    let conversation;

    if (conversationId) {
      if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid conversation ID.",
        });
      }

      conversation = await Conversation.findOne({
        _id: conversationId,
        employee,
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found.",
        });
      }
    } else {
      conversation = await Conversation.create({
        employee,
        ticket: null,
      });
    }

    // 4. Load recent conversation history
    const previousMessages = await ChatMessage.find({
      conversation: conversation._id,
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    previousMessages.reverse();

    const history = previousMessages.map((item) => ({
      senderType: item.senderType,
      message: item.message,
    }));

    // 5. Save employee message
    await ChatMessage.create({
      conversation: conversation._id,
      senderType: "employee",
      message,
    });

    let aiReply = "";
    let intent = "normal_chat";
    let options = [];

    // 6. Handle explicit @support command
    const isExplicitSupport = /^@support\b/i.test(message);
    const supportIssue = message
      .replace(/^@support\b/i, "")
      .trim();

    if (isExplicitSupport && !supportIssue) {
      aiReply =
        "Support mode is on. Please describe the issue you're facing.";

      intent = "explicit_support";
    } else if (isSimpleGreeting(message)) {
      // 7. Handle simple greetings without unnecessary AI calls
      aiReply = "Hey! 😊 How can I help you today?";
      intent = "normal_chat";
    } else {
      // 8. Analyze other messages using Groq
      const ai = await understandMessage({
        message,
        history,
      });

      intent = isExplicitSupport
        ? "explicit_support"
        : ai.intent || "normal_chat";

      if (
        intent === "possible_support" ||
        intent === "explicit_support"
      ) {
        aiReply =
          "This sounds like a support issue. Would you like to create a support ticket or continue chatting?";

        options = [
          {
            label: "Create Support Ticket",
            value: "create_ticket",
          },
          {
            label: "Continue Chatting",
            value: "continue_chat",
          },
        ];
      } else {
        aiReply =
          typeof ai.reply === "string" && ai.reply.trim()
            ? ai.reply.trim()
            : "I'm here to help. What would you like to know?";
      }
    }

    // 9. Save AI reply
    await ChatMessage.create({
      conversation: conversation._id,
      senderType: "ai",
      message: aiReply,
    });

    // 10. Fetch complete conversation history
    const messages = await ChatMessage.find({
      conversation: conversation._id,
    }).sort({ createdAt: 1 });

    // 11. Return chat response
    return res.status(200).json({
      success: true,
      message: "Message processed successfully.",
      data: {
        conversationId: conversation._id,
        intent,
        aiReply,
        options,
        ticketCreated: false,
        messages,
      },
    });
  } catch (error) {
    console.error("Send message controller error:", {
      message: error.message,
      status: error.status ?? error.error?.code ?? error.code,
    });

    return res.status(500).json({
      success: false,
      message: "Failed to process message.",
    });
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    if (!mongoose.isValidObjectId(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID.",
      });
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      employee: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const messages = await ChatMessage.find({
      conversation: conversation._id,
    })
      .sort({ createdAt: 1 })
      .lean();

    const options = conversation.ticket
      ? []
      : [];

    return res.status(200).json({
      success: true,
      message: "Conversation loaded successfully.",
      data: {
        conversationId: conversation._id.toString(),
        messages,
        options,
      },
    });
  } catch (error) {
    next(error);
  }
};
