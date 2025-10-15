
// src/pages/LandingPage.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiShield,
  FiStar,
  FiPhone,
  FiGlobe,
  FiX,
  FiMessageCircle,
} from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

/**
 * LandingPage.tsx
 * - Dark themed marketing landing page
 * - Sticky chat bubble (bottom-right) that expands to a small chat panel
 * - Non-overlapping layout; chat bubble is fixed and does not cover important UI
 *
 * Save as src/pages/LandingPage.tsx
 */

const FEATURES = [
  {
    title: "All cards in one place",
    desc: "Swipe, manage and pay from a single dashboard. Add cards in seconds.",
    icon: <FiCheckCircle />,
  },
  {
    title: "Smart payments",
    desc: "Auto-pay reminders, split bills and quick UPI payments — secure and instant.",
    icon: <FiPhone />,
  },
  { title: "Card controls", desc: "Block/unblock, change limits and manage PINs from the app.", icon: <FiShield /> },
  { title: "Rewards & offers", desc: "Get curated offers and cashback tailored to your cards.", icon: <FiStar /> },
];

const TESTIMONIALS = [
  { name: "Asha Mehra", role: "Product Manager", text: "Creda made my credit life simple — I can track all cards and pay bills in one place.", score: 5 },
  { name: "Rohit Verma", role: "Freelancer", text: "Love the card controls — blocked a lost card in one tap. Support responded instantly.", score: 5 },
  { name: "Nisha Rao", role: "Entrepreneur", text: "The rewards suggestions saved me money on travel and shopping. Highly recommend.", score: 5 },
];

export default function LandingPage() {
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative">
      {/* Top nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg">C</div>
          <div>
            <div className="font-semibold text-lg">CREDA</div>
            <div className="text-xs text-gray-400 -mt-0.5">Card Hub</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a className="text-gray-300 hover:text-white" href="#features">Features</a>
          <a className="text-gray-300 hover:text-white" href="#testimonials">Testimonials</a>
          <a className="text-gray-300 hover:text-white" href="#pricing">Plans</a>
          <a className="text-gray-300 hover:text-white" href="#contact">Contact</a>
          <a href="/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold">Sign in</a>
        </div>

        <div className="md:hidden">
          <a href="/login" className="px-3 py-2 bg-blue-600 rounded-md text-sm">Sign in</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Manage your credit cards. <span className="text-blue-400">Effortlessly.</span>
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl">
              CREDA brings your cards, payments and rewards together. Track outstanding balances, pay bills, control cards and chat with support — all from a single secure place.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="/signup" className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-400 font-semibold shadow-lg hover:scale-[1.02] transition">
                Get started — it's free
              </a>
              <a href="#features" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200">Explore features</a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">A</div>
                <div>
                  <div className="text-xs">Trusted by</div>
                  <div className="font-medium">120k+ users</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-500">As seen on</div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="px-3 py-1 rounded bg-white/5">FintechMag</div>
                  <div className="px-3 py-1 rounded bg-white/5">DailyMoney</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: product mock + CTA */}
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-gray-900/60 to-black border border-gray-800 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-300">Overview</div>
                  <div className="text-lg font-semibold">My Cards</div>
                </div>
                <div className="text-xs text-gray-400">Hi, Arjun</div>
              </div>

              <div className="grid gap-4">
                {/* card mock */}
                <div className="rounded-xl p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm opacity-90">Axis Bank · VISA</div>
                      <div className="mt-6 text-2xl font-semibold tracking-widest">**** **** **** 8910</div>
                      <div className="text-xs mt-2 opacity-90">ARJUN KAPOOR · EXP 10/26</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs">Outstanding</div>
                      <div className="text-lg font-bold mt-2">₹12,499</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">Manage PIN</button>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">Pay</button>
                </div>
              </div>
            </div>

            {/* Repositioned support CTA: no absolute overlap */}
            <div className="mt-4 md:mt-6 flex md:justify-end">
              <div className="flex items-center gap-3 bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-3">
                <div className="text-sm text-gray-300">Need help?</div>
                <a href="/support" className="px-3 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-medium">Chat with support</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold mb-4">Powerful features built for modern users</h3>
        <p className="text-gray-400 mb-8 max-w-2xl">Everything you need to manage your cards and payments in one place, designed to be secure, fast and delightful.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-lg bg-white/6 grid place-items-center text-2xl mb-3">{f.icon}</div>
              <div className="font-semibold">{f.title}</div>
              <div className="text-sm text-gray-400 mt-2">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gradient-to-br from-black/60 to-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">What users say</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="p-2 rounded bg-gray-800 hover:bg-gray-700 hidden sm:inline"><FiChevronLeft /></button>
              <button onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)} className="p-2 rounded bg-gray-800 hover:bg-gray-700 hidden sm:inline"><FiChevronRight /></button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
              <TestimonialCarousel idx={idx} setIdx={setIdx} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-indigo-800 to-sky-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to simplify your credit life?</h3>
            <p className="text-gray-200/90 mt-2 max-w-xl">Start using CREDA today — secure, reliable and built for real people who juggle multiple cards.</p>
          </div>

          <div className="flex gap-3">
            <a href="/signup" className="px-6 py-3 rounded-lg bg-white text-black font-semibold">Create account</a>
            <a href="/demo" className="px-6 py-3 rounded-lg border border-white/20 text-white">Request demo</a>
          </div>
        </div>
      </section>

      {/* FAQ/Info strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4">
            <div className="font-semibold">Secure by design</div>
            <div className="text-sm text-gray-400 mt-1">Bank-grade encryption, 2FA support and continuous monitoring.</div>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4">
            <div className="font-semibold">24/7 support</div>
            <div className="text-sm text-gray-400 mt-1">Chat and ticketing included — our support team is always ready.</div>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4">
            <div className="font-semibold">Join thousands</div>
            <div className="text-sm text-gray-400 mt-1">Trusted by customers and partners across India.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center">C</div>
              <div>
                <div className="font-semibold">CREDA</div>
                <div className="text-xs text-gray-400">Card Hub</div>
              </div>
            </div>
            <div className="text-sm text-gray-400 max-w-sm">Copyright © {new Date().getFullYear()} CREDA — Built with ❤️ for better credit management.</div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-400">
              <a className="hover:text-white" href="#"><FaTwitter /></a>
              <a className="hover:text-white" href="#"><FaLinkedin /></a>
              <a className="hover:text-white" href="#"><FaGithub /></a>
            </div>

            <div className="text-sm text-gray-400">
              <div>Support</div>
              <div className="text-xs">support@creda.app</div>
            </div>
          </div>
        </div>
      </footer>

      {/* -------------------------
          Sticky Chat Bubble + Panel
         ------------------------- */}
      <ChatBubble />
    </div>
  );
}

/* ----------------------------- */
/* TestimonialCarousel component  */
/* ----------------------------- */
function TestimonialCarousel({ idx, setIdx }: { idx: number; setIdx: (v: number) => void }) {
  const [index, setIndex] = useState(idx);

  useEffect(() => {
    setIndex(idx);
  }, [idx]);

  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setIdx(index);
  }, [index, setIdx]);

  return (
    <div className="relative">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-xl font-bold">
          {TESTIMONIALS[index].name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{TESTIMONIALS[index].name}</div>
              <div className="text-xs text-gray-400">{TESTIMONIALS[index].role}</div>
            </div>
            <div className="text-yellow-400 flex items-center gap-1">
              {Array.from({ length: TESTIMONIALS[index].score }).slice(0, 5).map((_, i) => <FiStar key={i} />)}
            </div>
          </div>

          <div className="mt-3 text-gray-200">{TESTIMONIALS[index].text}</div>

          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => setIndex((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="p-2 rounded bg-gray-800 hover:bg-gray-700">
              <FiChevronLeft />
            </button>
            <button onClick={() => setIndex((index + 1) % TESTIMONIALS.length)} className="p-2 rounded bg-gray-800 hover:bg-gray-700">
              <FiChevronRight />
            </button>
            <div className="ml-3 text-sm text-gray-400">Showcasing {index + 1} of {TESTIMONIALS.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- */
/* ChatBubble component (sticky)  */
/* ----------------------------- */
function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Hi — I'm Creda Assist. How can I help you today?" },
  ]);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll messages when updated
  useEffect(() => {
    if (!panelRef.current) return;
    const el = panelRef.current.querySelector(".messages");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    // fake bot reply after short delay
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: "Thanks — a support agent will reach out shortly. Meanwhile, try 'pay bill' or 'add card'." }]);
    }, 700);
  };

  return (
    <>
      {/* Chat panel */}
      <div
        ref={panelRef}
        className={`fixed z-50 right-4 bottom-24 md:bottom-8 transition-all duration-200 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-6"
        }`}
        style={{ width: 360 }}
      >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center font-semibold">C</div>
              <div>
                <div className="font-medium">Creda Assist</div>
                <div className="text-xs text-gray-400">Chat & support</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="p-2 rounded hover:bg-gray-800"
                aria-label="Close chat"
                title="Close chat"
              >
                <FiX />
              </button>
            </div>
          </div>

          <div className="messages max-h-64 overflow-auto px-4 py-3 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`${m.from === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200"} px-3 py-2 rounded-lg max-w-[80%]`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-3 border-t border-gray-800 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask about payments, cards or support..."
              className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none"
            />
            <button onClick={send} className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-medium">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Sticky bubble */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3">
        <div className="hidden md:block text-xs text-gray-400 mb-1 mr-1">Support</div>
        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Open support chat"
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg flex items-center justify-center text-white text-2xl border-2 border-black/40"
          title="Chat with support"
        >
          <FiMessageCircle />
        </button>
      </div>
    </>
  );
}

