"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Heart, Candy, Sparkles, Coffee, X, Camera } from "lucide-react";

// --- Types & Data ---
const QUESTS = [
  {
    title: "When we first met...",
    description: "The time you misspelt fine shit",
    icon: <Sparkles className="text-yellow-400" />,
    image: "/valengadFirst.png",
  },
  {
    title: "Our first...",
    description: "Our first date, holding hands, hug, kiss, make out",
    icon: <Coffee className="text-amber-600" />,
    image: "/valengadSecond.png",
  },
  {
    title: "Us in the virtual world",
    description: "Why tf am I in a wheelchair?",
    icon: <Candy className="text-pink-400" />,
    image: "/valengadThird.png",
  },
  {
    title: "Lowkey us in the real world",
    description: "Kissy kissy mwah mwah 😘",
    icon: <Heart className="text-red-500" />,
    image: "/valengadQuadro.png",
  },
];

export default function BubblyValentine() {
  const [daysTogether, setDaysTogether] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const startDate = new Date("2025-06-28");
    const diff = Math.floor(
      (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    setDaysTogether(diff);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Gaegu:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-[#fff0f3] text-[#7209b7] overflow-x-hidden"
        style={{ fontFamily: '"Fredoka", sans-serif' }}
      >
        {/* --- Photo Modal --- */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-pink-900/40 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-sm w-full bg-white p-3 rounded-[2rem] shadow-2xl border-4 border-white"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-4 -right-4 bg-pink-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <X size={24} />
                </button>
                <img
                  src={selectedImage}
                  alt="Memory"
                  className="w-full h-auto rounded-[1.5rem] object-cover"
                />
                <p className="text-center mt-3 font-bold text-pink-500 italic">
                  ✨ Pure Magic ✨
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Floating Hearts Background --- */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: "100vh",
                x: Math.random() * 100 + "vw",
                opacity: 0,
              }}
              animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
              className="absolute text-pink-200"
            >
              <Heart size={Math.random() * 40 + 20} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        {/* --- Hero Section --- */}
        <section className="relative h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="bg-white/80 backdrop-blur-sm p-12 rounded-[3rem] shadow-[0_20px_0_0_#ffb3c1] border-4 border-[#ffb3c1] text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart
                size={60}
                className="mx-auto mb-4 text-red-400"
                fill="#f87171"
              />
            </motion.div>
            <h1 className="text-2xl font-bold uppercase tracking-wide text-pink-500">
              DAYS TOGETHER 🥰😘
            </h1>
            <div className="text-8xl font-black text-pink-600 my-2 drop-shadow-lg">
              {daysTogether}
            </div>
            <p className="text-xl font-bold italic opacity-70">
              And counting... ✨😉😏
            </p>
          </motion.div>
        </section>

        {/* --- Bubbly Quest Log --- */}
        <section className="relative max-w-2xl mx-auto py-20 px-10">
          <h2 className="text-4xl font-black text-center mb-24 text-pink-500 drop-shadow-sm italic">
            Quest Log 📖
          </h2>

          <div className="absolute left-1/2 transform -translate-x-1/2 top-40 bottom-20 w-3 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-pink-400 to-red-400 origin-top"
              style={{ height: "100%", scaleY }}
            />
          </div>

          <div className="space-y-40 relative">
            {QUESTS.map((quest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div
                  onClick={() => setSelectedImage(quest.image)}
                  className="w-1/2 bg-white p-6 rounded-[2rem] shadow-xl border-b-8 border-pink-200 hover:scale-105 transition-transform cursor-pointer group relative"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {quest.icon}
                    <h3 className="text-lg font-bold">{quest.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {quest.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={14} /> Click to see memory
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-pink-400 border-4 border-white shadow-lg z-10 shrink-0" />
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- The Envelope --- */}
        <section className="min-h-screen flex flex-col items-center justify-center relative p-10">
          {/* ... (Same Envelope Code as before) ... */}
          <div
            className="relative w-full max-w-[350px] h-[250px] perspective-1000 cursor-pointer"
            onClick={() => setIsLetterOpen(true)}
          >
            <div className="absolute inset-0 bg-[#ff8fa3] rounded-2xl shadow-2xl z-20 flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 w-full h-full border-[100px] border-transparent border-t-[#ffb3c1] z-10" />
              {!isLetterOpen && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity }}
                >
                  <Heart
                    fill="white"
                    className="text-white relative z-30"
                    size={50}
                  />
                </motion.div>
              )}
            </div>

            <motion.div
              initial={false}
              animate={{
                rotateX: isLetterOpen ? 160 : 0,
                zIndex: isLetterOpen ? 5 : 25,
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-[#ffb3c1] rounded-t-2xl origin-top shadow-md border-b-2 border-pink-300"
              style={{ transformStyle: "preserve-3d" }}
            />

            <motion.div
              initial={false}
              animate={{
                y: isLetterOpen ? -180 : 0,
                scale: isLetterOpen ? 1.1 : 0.9,
                zIndex: isLetterOpen ? 40 : 10,
              }}
              className="absolute top-4 left-4 right-4 bg-white p-6 rounded-lg shadow-xl min-h-[350px] border-t-8 border-pink-400 text-gray-800"
              style={{ fontFamily: '"Gaegu", cursive' }}
            >
              <AnimatePresence>
                {isLetterOpen && <TypewriterText />}
              </AnimatePresence>
            </motion.div>
          </div>

          {isLetterOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLetterOpen(false);
              }}
              className="mt-40 text-pink-400 font-bold underline"
            >
              Close letter
            </motion.button>
          )}
        </section>
      </main>
    </>
  );
}

function TypewriterText() {
  const lines = [
    "Hi Cutie, 🍓",
    "You are the purest love I've known, a warmth that feels like mine alone.",
    "Like ocean waves, both wild and free, you pull me in so effortlessly.",
    "If love is light, then you're the sun, a glow that lingers when day is done.",
    "And if the world should fall a part, you'd still be safe within my heart.",
    "Will you be my Valentine? ❤️ (if yes, dm me on instagram if no, dm me on messenger)",
  ];

  return (
    <div className="space-y-4 text-lg md:text-2xl leading-tight">
      {lines.map((text, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.8 + 0.5, duration: 0.5 }}
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
