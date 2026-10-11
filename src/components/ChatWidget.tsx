
import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
} from "react";
import {
  X,
  Send,
  MessageCircle,
  LoaderCircle,
} from "lucide-react";
import "./ChatWidget.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const API_URL = "https://portfolio-ai-chatbot-vm0h.onrender.com/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Vansh's AI assistant. Ask me about his skills, projects, or experience.",
    },
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll only the chat's message container, not the whole website.
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container || !isOpen) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, isOpen]);

  async function sendMessage(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const question = input.trim();

    if (!question || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: question },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error(`Chat API failed: ${response.status}`);
      }

      const data: { answer: string } = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.answer || "I couldn't generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Portfolio chatbot request failed:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I'm having a little trouble responding right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Keep mouse-wheel scrolling inside the chat when its messages overflow.
  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    const container = event.currentTarget;

    if (container.scrollHeight > container.clientHeight) {
      event.stopPropagation();
    }
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <section
          className="chat-panel"
          aria-label="AI portfolio assistant"
        >
          <header className="chat-header">
            <div className="chat-avatar">
              <img src="/vansh-avatar.png" alt="Vansh" />
            </div>

            <div className="chat-heading">
              <strong>Vansh AI</strong>
              <span>Portfolio Assistant</span>
            </div>

            <button
              type="button"
              className="chat-icon-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>

          <div
            ref={messagesContainerRef}
            className="chat-messages"
            aria-live="polite"
            onWheel={handleWheel}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role}`}
              >
                {message.content}
              </div>
            ))}

            {loading && (
              <div className="chat-loading">
                <LoaderCircle
                  size={16}
                  className="chat-spinner"
                />
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chat-form" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Vansh..."
              aria-label="Your message"
              maxLength={1000}
              disabled={loading}
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={loading || !input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
