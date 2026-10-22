
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowUp,
  Sparkles,
  LoaderCircle,
  Plus,
  Ticket,
  MessageCircle,
  AlertCircle,
  Paperclip,
  FileText,
  X,
  Headset,
  Command,
} from "lucide-react";

import { useChat } from "../../../context/ChatContext.jsx";

const TicketChat = () => {
  const { oneid } = useParams();
  const navigate = useNavigate();

  const chatScrollRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);

  const {
    conversationId,
    messages,
    sendMessage,
    loadConversation,
    createTicket,
    continueChatting,
    startNewConversation,
    loading,
    error,
    supportOptions,
  } = useChat();

  const [input, setInput] = useState("");
  const [pageError, setPageError] = useState("");
  const [showSupportMenu, setShowSupportMenu] = useState(false);
  const [file, setFile] = useState(null);

  // Load saved conversation.
  useEffect(() => {
    if (!oneid || conversationId === oneid) return;

    let cancelled = false;

    const load = async () => {
      setPageError("");

      try {
        await loadConversation(oneid);
      } catch (err) {
        if (!cancelled) {
          setPageError(
            err.response?.data?.message ||
              err.message ||
              "Could not load this conversation."
          );
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [oneid, conversationId, loadConversation]);

  // Keep the newest messages visible.
  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (scrollFrameRef.current) {
      cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = requestAnimationFrame(() => {
      const container = chatScrollRef.current;
      if (!container) return;

      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    });
  }, []);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollToBottom("smooth");
    }
  }, [messages, loading, supportOptions, scrollToBottom]);

  useEffect(() => {
    scrollToBottom("auto");

    return () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [oneid, scrollToBottom]);

  // Track whether the user is reading older messages.
  const handleScroll = () => {
    const container = chatScrollRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    shouldAutoScrollRef.current = distanceFromBottom < 120;
  };

  // @support autocomplete.
  const handleInputChange = (event) => {
    const value = event.target.value;
    const cursor = event.target.selectionStart;

    setInput(value);
    setPageError("");

    const match = value.slice(0, cursor).match(/(?:^|\s)@[\w-]*$/);

    setShowSupportMenu(Boolean(match));
  };

  const selectSupport = () => {
    const textarea = textareaRef.current;
    const cursor = textarea?.selectionStart ?? input.length;

    const before = input.slice(0, cursor);
    const after = input.slice(cursor);

    const updatedBefore = before.replace(
      /(?:^|\s)@[\w-]*$/,
      (match) => `${match.startsWith(" ") ? " " : ""}@support `
    );

    const updatedInput = updatedBefore + after;
    const newPosition = updatedBefore.length;

    setInput(updatedInput);
    setShowSupportMenu(false);

    requestAnimationFrame(() => {
      if (!textarea) return;

      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    setPageError("");
    setShowSupportMenu(false);

    // Keep new messages following the latest response.
    shouldAutoScrollRef.current = true;
    scrollToBottom("smooth");

    try {
      const data = await sendMessage(message);

      // Direct @support issue handling is managed by ChatContext.
      if (
        /^@support\b/i.test(message) &&
        message.replace(/^@support\b/i, "").trim()
      ) {
        setInput("");
        return;
      }

      if (data?.conversationId && data.conversationId !== oneid) {
        navigate(`/create-ticket/${data.conversationId}`, {
          replace: true,
        });
      }

      setInput("");
    } catch (err) {
      setPageError(
        err.response?.data?.message ||
          err.message ||
          "Unable to send your message."
      );
    }
  };

  const handleCreateTicket = async () => {
    setPageError("");

    try {
      const data = await createTicket();

      if (data?.ticket?._id) {
        navigate(`/ticket/${data.ticket._id}`);
      }
    } catch (err) {
      setPageError(
        err.response?.data?.message ||
          err.message ||
          "Could not create the ticket."
      );
    }
  };

  const handleNewChat = () => {
    if (loading) return;

    startNewConversation();
    setInput("");
    setFile(null);
    setPageError("");
    setShowSupportMenu(false);
    shouldAutoScrollRef.current = true;

    navigate("/create-ticket");
  };

  // File selection only. Uploading needs a backend endpoint.
  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];

    if (!selected) return;

    if (selected.size > 10 * 1024 * 1024) {
      setPageError("The maximum attachment size is 10 MB.");
      event.target.value = "";
      return;
    }

    setFile(selected);
    setPageError("");
  };

  const removeFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatTime = (date) => {
    if (!date) return "";

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "";

    return parsed.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground">
      {/* Fixed compact header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src="/hank.png"
            alt="Hank AI"
            className="h-8 w-8 shrink-0 object-contain"
          />

          <div className="min-w-0">
            <h1 className="text-sm font-semibold">Hank AI</h1>
            <p className="text-[11px] text-muted-foreground">
              Support conversation
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNewChat}
          disabled={loading}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New chat</span>
        </button>
      </header>

      {/* Only this section scrolls */}
      <section
        ref={chatScrollRef}
        onScroll={handleScroll}
        className="chat-scroll no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-3 py-5 sm:gap-7 sm:px-6 sm:py-8">
          {messages.length === 0 && !loading && !pageError && !error && (
            <div className="flex min-h-56 flex-col items-center justify-center px-4 text-center">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="text-xl font-semibold tracking-tight">
                Let&apos;s solve this together
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Tell Hank what&apos;s happening. Ask a question or type{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  @
                </code>{" "}
                to access support.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => {
            const isUser =
              message.senderType === "employee" ||
              message.senderType === "user";

            const isAgent = message.senderType === "agent";

            return (
              <article
                key={message._id || `${index}-${message.message}`}
                className={`flex w-full items-start gap-2.5 sm:gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {isAgent ? (
                      <Headset className="h-3.5 w-3.5" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                  </div>
                )}

                <div
                  className={`min-w-0 max-w-[90%] sm:max-w-[80%] ${
                    isUser ? "order-first" : ""
                  }`}
                >
                  <div
                    className={`mb-1.5 flex items-center gap-2 text-[11px] text-muted-foreground ${
                      isUser ? "justify-end" : ""
                    }`}
                  >
                    <span>
                      {isUser ? "You" : isAgent ? "Support agent" : "Hank"}
                    </span>

                    {formatTime(message.createdAt) && (
                      <span>{formatTime(message.createdAt)}</span>
                    )}
                  </div>

                  <div
                    className={`whitespace-pre-wrap break-words text-sm leading-6 ${
                      isUser
                        ? "rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              </article>
            );
          })}

          {/* Responsive animated thinking indicator */}
          {loading && (
            <div
              role="status"
              aria-live="polite"
              className="flex w-full items-start gap-2.5 sm:gap-3"
            >
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              </div>

              <div className="flex min-w-0 flex-col gap-2 pt-1">
                <span className="text-xs font-medium text-muted-foreground">
                  Hank is thinking
                </span>

                <div className="flex h-5 items-center gap-1.5">
                  <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="thinking-dot thinking-dot-delay-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="thinking-dot thinking-dot-delay-2 h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          )}

          {(pageError || error) && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-500/5 px-3 py-2.5 text-sm text-red-500"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{pageError || error}</span>
            </div>
          )}

          {/* Suggested actions */}
          {supportOptions.length > 0 && (
            <div className="ml-9 flex flex-wrap gap-2">
              {supportOptions.some(
                (option) => option.value === "create_ticket"
              ) && (
                <button
                  type="button"
                  onClick={handleCreateTicket}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  Create Support Ticket
                </button>
              )}

              {supportOptions.some(
                (option) => option.value === "continue_chat"
              ) && (
                <button
                  type="button"
                  onClick={continueChatting}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs transition-colors hover:bg-muted disabled:opacity-50"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Continue Chatting
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Always-visible composer */}
      <footer className="relative z-20 shrink-0 bg-background px-3 pb-2 pt-2 sm:px-6 sm:pb-3">
        <div className="relative mx-auto w-full max-w-3xl">
          {showSupportMenu && !loading && (
            <div className="absolute bottom-full left-0 z-30 mb-2 w-64 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl">
              <p className="px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Suggestions
              </p>

              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={selectSupport}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Headset className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Support</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Create a support request
                  </p>
                </div>

                <Command className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-[24px] border border-border/80 bg-card shadow-sm transition-colors focus-within:border-primary/40"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Escape" && showSupportMenu) {
                  setShowSupportMenu(false);
                  return;
                }

                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();

                  if (showSupportMenu) {
                    selectSupport();
                  } else {
                    event.currentTarget.form?.requestSubmit();
                  }
                }
              }}
              rows={1}
              placeholder="Message Hank... (type @ for support)"
              disabled={loading}
              className="no-scrollbar max-h-32 min-h-12 w-full resize-none overflow-y-auto bg-transparent px-4 pt-3.5 text-sm leading-6 outline-none placeholder:text-muted-foreground disabled:opacity-60"
            />

            {file && (
              <div className="mx-3 mb-2 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs">
                <FileText className="h-4 w-4 shrink-0 text-primary" />

                <span className="max-w-48 truncate">{file.name}</span>

                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove attachment"
                  className="rounded-full p-1 transition-colors hover:bg-muted"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between px-3 pb-2.5">
              <div className="flex items-center gap-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.pdf,.png,.jpg,.jpeg,.webp,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  aria-label="Attach a file"
                  title="Attach a file"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                <span className="hidden pl-1 text-[10px] text-muted-foreground sm:inline">
                  Attach a file
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                title="Send message"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {loading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>

          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
            Hank can make mistakes. Verify important support advice.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default TicketChat;
