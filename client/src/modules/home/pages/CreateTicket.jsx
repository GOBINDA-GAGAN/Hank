
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Paperclip,
  Plus,
  X,
  LoaderCircle,
  AlertCircle,
  Headset,
  Command,
  Wifi,
  KeyRound,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../../context/ChatContext";

const suggestions = [
  {
    label: "Wi-Fi connection",
    message: "My Wi-Fi is not connecting.",
    icon: Wifi,
  },
  {
    label: "Reset password",
    message: "I need help resetting my password.",
    icon: KeyRound,
  },
  {
    label: "Contact support",
    message: "@support I cannot access my account.",
    icon: MessageCircle,
  },
];

const CreateTicket = () => {
  const navigate = useNavigate();

  const {
    sendMessage,
    startNewConversation,
    loading,
    error,
  } = useChat();

  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [localError, setLocalError] = useState("");
  const [showSupportMenu, setShowSupportMenu] = useState(false);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start a fresh conversation whenever this page is opened.
  useEffect(() => {
    startNewConversation();
    setInput("");
    setAttachment(null);
    setLocalError("");
    setShowSupportMenu(false);
  }, [startNewConversation]);

  // Automatically resize the textarea.
  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      140
    )}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [input, resizeTextarea]);

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInput(value);
    setLocalError("");

    // Show the support command when the user types @.
    setShowSupportMenu(/(?:^|\s)@[\w-]*$/.test(value));
  };

  const insertSupportCommand = () => {
    setInput((current) => {
      const trimmed = current
        .replace(/(?:^|\s)@[\w-]*$/, "")
        .trimEnd();

      return `${trimmed}${trimmed ? " " : ""}@support `;
    });

    setShowSupportMenu(false);
    textareaRef.current?.focus();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setLocalError("Choose a file smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setAttachment(file);
    setLocalError("");
    event.target.value = "";
  };

  const submitMessage = async (rawMessage) => {
    const message = rawMessage.trim();

    if (!message || loading) return;

    // File selection is a preview only until backend upload is implemented.
    if (attachment) {
      setLocalError(
        "File uploads are not connected yet. Remove the attachment to continue."
      );
      return;
    }

    setInput("");
    setLocalError("");
    setShowSupportMenu(false);

    try {
      const data = await sendMessage(message);

      // Direct @support issue creation is handled by ChatContext.
      // Normal messages open the persisted conversation.
      if (
        data?.conversationId &&
        !/^@support\s+\S/i.test(message)
      ) {
        navigate(`/create-ticket/${data.conversationId}`, {
          replace: true,
        });
      }
    } catch (err) {
      setInput(message);

      setLocalError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to send your message. Please try again."
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const message = input.trim();

    if (!message && !attachment) return;

    if (!message && attachment) {
      setLocalError("Describe the file before sending.");
      return;
    }

    await submitMessage(message);
  };

  const displayedError = localError || error;

  return (
    <main className="flex h-dvh min-h-0 w-full flex-col overflow-hidden bg-background text-foreground">
      {/* Compact SaaS header */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Headset size={15} />
          </div>

          <span className="text-sm font-semibold tracking-tight">
            Hank Support
          </span>

          <span className="hidden text-xs text-muted sm:inline">
            / New conversation
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/tickets")}
          className="btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium"
        >
          <MessageCircle size={14} />
          <span>My tickets</span>
        </button>
      </header>

      {/* Main content */}
      <section className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6">
          <div className="my-auto py-8">
            {/* Compact welcome heading */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary">
                <Headset size={18} />
              </div>

              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  How can we help?
                </h1>

                <p className="mt-0.5 text-xs text-muted sm:text-sm">
                  Describe your issue and we’ll help you resolve it.
                </p>
              </div>
            </div>

            {/* Vertical suggestions */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;

                return (
                  <button
                    key={suggestion.label}
                    type="button"
                    disabled={loading}
                    onClick={() => submitMessage(suggestion.message)}
                    className={`group flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-card-hover disabled:cursor-not-allowed disabled:opacity-50 ${
                      index > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-muted transition-colors group-hover:text-primary">
                      <Icon size={16} />
                    </span>

                    <span className="min-w-0 flex-1 text-sm font-medium">
                      {suggestion.label}
                    </span>

                    <Plus
                      size={15}
                      className="shrink-0 text-muted transition-colors group-hover:text-primary"
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-center text-xs text-muted">
              Or type your question below to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Floating composer: intentionally no top border */}
      <footer className="shrink-0 bg-background px-3 pb-3 pt-3 sm:px-6 sm:pb-4">
        <div className="mx-auto w-full max-w-4xl">
          {/* @support autocomplete */}
          {showSupportMenu && (
            <div className="mb-2 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-sm">
              <button
                type="button"
                onClick={insertSupportCommand}
                className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-card-hover"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted text-primary">
                  <Command size={16} />
                </span>

                <span>
                  <span className="block text-sm font-medium">
                    @support
                  </span>

                  <span className="block text-xs text-muted">
                    Create a support ticket
                  </span>
                </span>
              </button>
            </div>
          )}

          {/* Selected attachment */}
          {attachment && (
            <div className="mb-2 flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
              <Paperclip size={16} className="shrink-0 text-primary" />

              <span className="min-w-0 flex-1 truncate text-xs">
                {attachment.name}
              </span>

              <button
                type="button"
                aria-label="Remove attachment"
                onClick={() => setAttachment(null)}
                className="rounded-md p-1.5 text-muted transition-colors hover:bg-card-hover hover:text-foreground"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* Error message */}
          {displayedError && (
            <div
              role="alert"
              className="mb-2 flex items-start gap-2 rounded-xl border border-danger/30 p-3 text-xs text-danger"
            >
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>{displayedError}</span>
            </div>
          )}

          {/* Input box */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[22px] border border-border bg-card px-4 pt-4 shadow-[0_2px_8px_rgba(15,23,42,0.08)] transition-all focus-within:border-primary/40 focus-within:shadow-md"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }

                if (event.key === "Escape") {
                  setShowSupportMenu(false);
                }
              }}
              rows={1}
              placeholder="Message Hank... (type @ for support)"
              aria-label="Message Hank"
              className="block max-h-36 min-h-8 w-full resize-none bg-transparent text-sm leading-6 text-foreground outline-none placeholder:text-muted"
            />

            {/* Bottom action row */}
            <div className="flex items-center justify-between gap-3 pb-2 pt-3">
              <div className="flex min-w-0 items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
                  onChange={handleFileChange}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Attach a file"
                  title="Attach a file"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card-hover hover:text-foreground"
                >
                  <Paperclip size={17} />
                </button>

                <span className="text-[11px] text-muted">
                  Attach a file
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <ArrowUp size={19} />
                )}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-[11px] text-muted">
            Hank can make mistakes. Verify important support advice.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default CreateTicket;