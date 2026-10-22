
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  sendMessageApi,
  getConversationApi,
} from "../services/chat.api.js";

import { createTicketApi } from "../services/ticket.api.js";

const ChatContext = createContext(null);

const getApiData = (response) => {
  const body = response?.data ?? response;
  return body?.data ?? body;
};

export const ChatProvider = ({ children }) => {
  const navigate = useNavigate();

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [pendingIssue, setPendingIssue] = useState("");
  const [supportOptions, setSupportOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateConversation = useCallback((data) => {
    if (data?.conversationId) {
      setConversationId(data.conversationId);
    }

    if (Array.isArray(data?.messages)) {
      setMessages(data.messages);
    }

    if (Array.isArray(data?.options)) {
      setSupportOptions(data.options);
    }
  }, []);

  // A new chat clears only frontend state.
  // Existing MongoDB conversations remain untouched.
  const startNewConversation = useCallback(() => {
    setConversationId(null);
    setMessages([]);
    setPendingIssue("");
    setSupportOptions([]);
    setError("");
  }, []);

  // Send a message and create a conversation on the backend
  // when no conversationId is supplied.
  const sendMessage = useCallback(
    async (text) => {
      const message = text?.trim();

      if (!message) return null;

      setLoading(true);
      setError("");

      try {
        // Direct support command: @support + issue.
        if (/^@support\b/i.test(message)) {
          const issue = message.replace(/^@support\b/i, "").trim();

          // @support alone continues through normal AI chat.
          if (!issue) {
            const response = await sendMessageApi({
              message,
              ...(conversationId ? { conversationId } : {}),
            });

            const data = getApiData(response);

            if (!data?.conversationId) {
              throw new Error(
                "The server did not return a conversation ID."
              );
            }

            updateConversation(data);
            setPendingIssue("");
            return data;
          }

          const response = await createTicketApi({
            issue,
            ...(conversationId ? { conversationId } : {}),
          });

          const data = getApiData(response);

          if (!data?.ticket?._id) {
            throw new Error("The server did not return a ticket ID.");
          }

          updateConversation(data);
          setPendingIssue("");
          setSupportOptions([]);

          navigate(`/ticket/${data.ticket._id}`);

          return data;
        }

        // Normal chat.
        const response = await sendMessageApi({
          message,
          ...(conversationId ? { conversationId } : {}),
        });

        const data = getApiData(response);

        if (!data?.conversationId) {
          throw new Error(
            "The server did not return a conversation ID."
          );
        }

        updateConversation(data);

        const options = Array.isArray(data.options)
          ? data.options
          : [];

        setSupportOptions(options);

        setPendingIssue(
          options.some(
            (option) => option.value === "create_ticket"
          )
            ? message
            : ""
        );

        return data;
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to send your message."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [conversationId, navigate, updateConversation]
  );

  // Load an existing conversation from its ID.
  const loadConversation = useCallback(async (id) => {
    if (!id) return null;

    setLoading(true);
    setError("");

    try {
      const response = await getConversationApi(id);
      const data = getApiData(response);

      setConversationId(data.conversationId || id);
      setMessages(
        Array.isArray(data.messages) ? data.messages : []
      );
      setSupportOptions(
        Array.isArray(data.options) ? data.options : []
      );
      setPendingIssue(data.pendingIssue || "");

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load conversation."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a ticket from the current chat.
  const createTicket = useCallback(
    async (issue = pendingIssue, options = {}) => {
      const cleanIssue = issue?.trim();

      if (!cleanIssue) {
        throw new Error("Please provide a support issue.");
      }

      setLoading(true);
      setError("");

      try {
        const response = await createTicketApi({
          issue: cleanIssue,
          ...(conversationId ? { conversationId } : {}),
        });

        const data = getApiData(response);

        if (!data?.ticket?._id) {
          throw new Error("The server did not return a ticket ID.");
        }

        updateConversation(data);
        setPendingIssue("");
        setSupportOptions([]);

        if (options.navigate !== false) {
          navigate(`/ticket/${data.ticket._id}`);
        }

        return data;
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to create support ticket."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [
      conversationId,
      navigate,
      pendingIssue,
      updateConversation,
    ]
  );

  // Create an independent ticket for a CSV row.
  const createTicketForIssue = useCallback(async (issue) => {
    const cleanIssue = issue?.trim();

    if (!cleanIssue) {
      throw new Error("The issue cannot be empty.");
    }

    const response = await createTicketApi({
      issue: cleanIssue,
    });

    const data = getApiData(response);

    if (!data?.ticket?._id) {
      throw new Error("The server did not return a ticket ID.");
    }

    return data;
  }, []);

  const continueChatting = useCallback(() => {
    setPendingIssue("");
    setSupportOptions([]);
    setError("");
  }, []);

  const value = {
    conversationId,
    messages,
    loading,
    error,
    pendingIssue,
    supportOptions,
    sendMessage,
    loadConversation,
    createTicket,
    createTicketForIssue,
    continueChatting,
    startNewConversation,
    setConversationId,
    setMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }

  return context;
};
