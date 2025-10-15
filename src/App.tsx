/*
Cred-like Home Page (Vite + React + TypeScript + Tailwind + Framer Motion)

Instructions:
1) Install dependencies:
   yarn add framer-motion classnames
   or
   npm install framer-motion classnames

2) Tailwind: ensure tailwind is configured and imported in your main css (e.g. index.css)
   @tailwind base; @tailwind components; @tailwind utilities;

3) Use this file as a page or component (e.g. src/pages/Home.tsx) and import into your router.

This single-file component contains several small internal components (Navbar, Hero, Cards, AnimatedBG), uses external images from Unsplash/Picsum, and includes bold, high-energy animations.

Notes:
- "Use all internet images" is interpreted as using dynamic CDN image sources (Unsplash/Picsum). Replace with your own images if needed.
- All styling uses Tailwind classes. Dark/black theme is the default.
*/

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// small helper
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function CredCloneHome() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBG />
      <div className="relative z-10">
        <Navbar />
        <main className="px-6 md:px-12 lg:px-24 pt-12 pb-24">
          <Hero />
          <section className="mt-16">
            <TrustMarquee />
          </section>

          <section className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Rewards that excite"
              desc="Unlock curated rewards every month — experiences, cashbacks and NFTs."
              image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=60"
            />
            <FeatureCard
              title="Pay with confidence"
              desc="Advanced security, smooth reconnections and lightning-fast checkouts."
              image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=60"
            />
            <FeatureCard
              title="Track your wins"
              desc="Beautiful insights and streaks — gamified to keep you in control."
              image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=60"
            />
          </section>

          <section className="mt-20">
            <AnimatedShowcase />
          </section>

          <section className="mt-20">
            <CallToAction />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="flex items-center justify-between px-2 md:px-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
          <span className="font-bold">C</span>
        </div>
        <div className="hidden md:block">
          <nav className="flex gap-6 text-sm text-gray-300">
            <a className="hover:text-white transition">Products</a>
            <a className="hover:text-white transition">Rewards</a>
            <a className="hover:text-white transition">Learn</a>
          </nav>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-sm border border-gray-700 px-4 py-2 rounded-full hover:bg-white/6 transition">Sign in</button>
        <button className="text-sm bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 rounded-full shadow-2xl transform hover:scale-105 transition">
          Get the app
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7">
        <AnimatePresence>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            A beautiful way to pay —
            <br /> rewards that actually feel like wins.
          </motion.h1>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-6 text-gray-300 max-w-xl"
        >
          We redesigned the payments home to be faster, more rewarding and full of delightful moments. Experience smooth animations, intelligent tracking and curated perks.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-black font-semibold shadow-lg transform hover:scale-105 transition">
            Create account
          </button>
          <button className="px-6 py-3 rounded-full border border-gray-700 text-gray-200 hover:bg-white/5 transition">Learn more</button>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {miniCards.map((c, i) => (
            <motion.div key={c.title} className="bg-white/4 p-4 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
            >
              <div className="text-sm font-semibold">{c.title}</div>
              <div className="text-xs text-gray-300 mt-1">{c.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/6 bg-gradient-to-b from-white/3 to-black/20"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-300">Total balance</div>
                <div className="text-2xl font-bold mt-1">₹ 12,48,042</div>
              </div>
              <div className="text-sm text-gray-300">Member • Gold</div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {cardImgs.map((src, idx) => (
                <img key={idx} src={src} className="w-full h-28 object-cover rounded-lg" alt="reward" />
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 py-2 rounded-full bg-white/6">Transact</button>
              <button className="py-2 px-4 rounded-full border border-white/6">Save</button>
            </div>
          </div>

          <svg className="absolute right-4 bottom-4 opacity-20" width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle cx="70" cy="70" r="70" fill="url(#g1)" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

const miniCards = [
  { title: "Streak: 7 days", sub: "Consistency rewards" },
  { title: "Score: 780", sub: "Creditworthiness" },
  { title: "₹2,000", sub: "Monthly cashback" },
  { title: "Bills", sub: "Auto-pay enabled" },
  { title: "Invest", sub: "Quick SIP" },
  { title: "NFT", sub: "Exclusive drop" },
];

const cardImgs = [
  "https://images.unsplash.com/photo-1528735604455-0c1f55d3e92d?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=60",
];

function FeatureCard({ title, desc, image }: { title: string; desc: string; image: string }) {
  return (
    <motion.article whileHover={{ scale: 1.02 }} className="rounded-3xl overflow-hidden bg-black/30 border border-white/6 p-1">
      <div className="p-6 rounded-2xl bg-gradient-to-b from-black/40 to-black/20 h-full flex flex-col">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img src={image} alt="feature" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-300">{desc}</p>
          </div>
        </div>

        <div className="mt-6 flex-1 flex items-end">
          <button className="ml-auto px-4 py-2 rounded-full bg-white/6">Explore</button>
        </div>
      </div>
    </motion.article>
  );
}

function AnimatedShowcase() {
  // A rotating, floating mosaic of images with depth effect
  const images = [
    'https://images.unsplash.com/photo-1508193638391-3f93f3bfb0e7?auto=format&fit=crop&w=900&q=60',
    'https://images.unsplash.com/photo-1519741491700-4c8b4b7a6c3f?auto=format&fit=crop&w=900&q=60',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=60',
    'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=60',
  ];

  return (
    <div className="rounded-3xl p-6 bg-gradient-to-b from-white/3 to-black/20 border border-white/6">
      <h3 className="text-2xl font-bold">Live rewards — Animated showcase</h3>
      <p className="text-gray-300 mt-2 max-w-xl">Hover and enjoy the parallax and depth animations. Images are pulled from open CDNs.</p>

      <div className="mt-6 relative h-64">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`show-${i}`}
            className="absolute w-48 h-32 object-cover rounded-xl shadow-2xl border border-white/8"
            initial={{ opacity: 0, scale: 0.9, rotate: (i % 2 ? -6 : 6), y: 20 * (i + 1), x: 30 * i }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: -10 * i }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 90 }}
            whileHover={{ scale: 1.06, y: -6, rotate: i % 2 ? -2 : 2 }}
            style={{ left: `${6 + i * 22}%`, top: `${6 + i * 8}%`, zIndex: 20 - i }}
          />
        ))}

        {/* floating radial */}
        <motion.div
          className="absolute -bottom-12 -right-12 w-80 h-80 rounded-full filter blur-3xl opacity-30"
          animate={{ scale: [0.95, 1.06, 0.95] }}
          transition={{ repeat: Infinity, duration: 8 }}
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.45), transparent 30%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.35), transparent 30%)' }}
        />
      </div>
    </div>
  );
}

function TrustMarquee() {
  const logos = [
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1502720705749-3c7a1a7b1b7b?auto=format&fit=crop&w=300&q=60',
  ];

  return (
    <div className="overflow-hidden py-6">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-6">
            {logos.map((l, i) => (
              <img key={i} src={l} className="w-28 h-12 object-cover rounded-lg opacity-90" alt="logo" />
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 18s linear infinite; }
      `}</style>
    </div>
  );
}

function CallToAction() {
  return (
    <motion.div initial="hidden" animate="show" variants={stagger} className="rounded-3xl p-8 bg-gradient-to-b from-black/30 to-black/20 border border-white/6">
      <motion.h2 variants={fadeUp} className="text-3xl font-extrabold">Ready to feel rewarded?</motion.h2>
      <motion.p variants={fadeUp} className="mt-3 text-gray-300 max-w-2xl">Join millions who use delightful payments and monthly rewards. Download the app and start getting rewarded today.</motion.p>

      <motion.div variants={fadeUp} className="mt-6 flex gap-4">
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-black font-semibold shadow-lg">Get the app</button>
        <button className="px-6 py-3 rounded-full border border-white/6">Explore features</button>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/6 pt-8 pb-20 text-sm text-gray-400">
      <div className="max-w-6xl mx-auto px-2 md:px-0 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Cred Clone — All rights reserved</div>
        <div className="flex gap-6">
          <a>Terms</a>
          <a>Privacy</a>
          <a>Contact</a>
        </div>
      </div>
    </footer>
  );
}

function AnimatedBG() {
  // layered animated gradients + soft particles
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <motion.div
        animate={{ rotate: [0, 15, 0, -15, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute -left-1/3 -top-1/3 w-2/3 h-2/3 rounded-full filter blur-3xl opacity-30"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.22), rgba(236,72,153,0.22))' }}
      />

      <motion.div
        animate={{ x: [0, 40, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-0 top-10 w-72 h-72 rounded-2xl filter blur-2xl opacity-30"
        style={{ background: 'linear-gradient(180deg, rgba(14,165,233,0.1), rgba(79,70,229,0.12))' }}
      />

      {/* subtle moving dots */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -6, 0], opacity: [0.6, 0.2, 0.6] }}
            transition={{ delay: i * 0.2, duration: 6 + (i % 4), repeat: Infinity }}
            className="absolute bg-white rounded-full opacity-20"
            style={{ width: 4 + (i % 3) * 3, height: 4 + (i % 3) * 3, left: `${(i * 13) % 100}%`, top: `${(i * 37) % 100}%` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />
    </div>
  );
}
