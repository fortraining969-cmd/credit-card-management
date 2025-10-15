// src/components/dashboard/SupportChat.tsx
import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

export default function SupportChat({
  compact = false,
  onOpen,
  onClose,
}: {
  compact?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(!compact);
  const [messages, setMessages] = useState<{ id: string; from: "bot" | "user"; text: string }[]>([
    { id: "m1", from: "bot", text: "Hi! I am Creda Assist. How can I help you today?" },
  ]);
  const [text, setText] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 9999 });
  }, [messages, open]);

  const send = () => {
    if (!text) return;
    const msg = { id: Date.now().toString(), from: "user" as const, text };
    setMessages((m) => [...m, msg]);
    setText("");
    setTimeout(() => {
      setMessages((m) => [...m, { id: (Date.now() + 1).toString(), from: "bot", text: `Thanks — I received: "${msg.text}". Try "view bills" or "block card".` }]);
    }, 650);
  };

  // Compact mode: show a small tile/button only (no heading duplicate)
  if (compact) {
    return (
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">Need help?</div>
        <button
          onClick={() => {
            setOpen(true);
            onOpen?.();
          }}
          className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded text-white"
        >
          Open Support
        </button>
      </div>
    );
  }

  // Full chat overlay
  if (!open) return null;

  return (
    <div className="fixed right-6 bottom-6 z-60 w-full max-w-md">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold">Creda Assist</div>
            <div className="text-xs text-gray-400">Customer support chatbot</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm text-gray-400" onClick={() => { setOpen(false); onClose?.(); }}>Close</button>
          </div>
        </div>

        <div ref={containerRef} className="max-h-64 overflow-auto divide-y divide-gray-800 py-2">
          {messages.map((m) => (
            <div key={m.id} className={`py-2 ${m.from === "bot" ? "text-gray-300" : "text-right"}`}>
              <div className={`inline-block px-3 py-2 rounded ${m.from === "bot" ? "bg-gray-800" : "bg-blue-600"}`}>{m.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-gray-800 rounded"
          />
          <button onClick={send} className="px-3 py-2 bg-blue-600 rounded"><FiSend /></button>
        </div>
      </div>
    </div>
  );
}
