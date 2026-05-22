"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChatDemo.module.css";

// A tiny, self-contained DEMO of the chat interface — purely to show how the
// design feels. It is NOT the real chat: replies are a few canned, rule-based
// responses computed in the browser. The real feature (many models via your own
// keys, streaming) is P0-3 and comes later.

type Message = { role: "user" | "assistant"; text: string };

const GREETING: Message = {
  role: "assistant",
  text: "Hi! I'm a tiny demo of the chat interface. Say hello to start.",
};

// Pick a canned reply based on simple keyword matching.
function replyTo(input: string): string {
  const text = input.toLowerCase();

  if (/\b(hi|hii|hey|hello|yo|namaste|hola)\b/.test(text)) {
    return "Hey there! Nice to meet you. This is just a design demo — the real app will chat with many AI models using your own API keys.";
  }
  if (text.includes("how are you")) {
    return "Running smoothly, thanks for asking! I'm only a placeholder for now, though.";
  }
  if (text.includes("your name") || text.includes("who are you")) {
    return "I'm the AI Aggregator demo bot — a preview of the chat UI, not the real thing yet.";
  }
  if (text.includes("bye") || text.includes("thanks")) {
    return "See you! Sign in up top to use the real app once it's ready.";
  }
  return `You said: "${input.trim()}". I only know a few canned replies for now — try saying "hi".`;
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the latest message in view as the conversation grows.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", text: trimmed };
    const assistantMessage: Message = { role: "assistant", text: replyTo(trimmed) };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  }

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <span className={styles.dot} aria-hidden="true" />
        Demo chat
      </div>

      <div className={styles.messages} ref={scrollRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.row} ${
              message.role === "user" ? styles.rowUser : styles.rowAssistant
            }`}
          >
            <div
              className={`${styles.bubble} ${
                message.role === "user" ? styles.bubbleUser : styles.bubbleAssistant
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form className={styles.composer} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Say hi…"
          aria-label="Message the demo chat"
          autoComplete="off"
        />
        <button className={styles.send} type="submit" aria-label="Send message">
          Send
        </button>
      </form>
    </div>
  );
}
