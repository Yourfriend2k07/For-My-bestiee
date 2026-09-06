import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundCtrl } from '../utils/audio.ts';
import { fireHugeCelebration, fireHeartBurst } from '../utils/confetti.ts';
import { Heart, Sparkles, RotateCcw, PartyPopper } from 'lucide-react';

interface Part6Props {
  onRestart: () => void;
}

export const Part6FinalMessage: React.FC<Part6Props> = ({ onRestart }) => {
  const [showBffPrompt, setShowBffPrompt] = useState(false);
  const [celebratingFinal, setCelebratingFinal] = useState(false);

  const lines = [
    'Yaar, mujhe bas tum chahiye ho... please, be my best friend again.',
    'I know uss moment mein main dumb tha, maine mistakes ki, aur shayad main perfect bhi nahi hoon, but yaar aisa toh mat karo na.',
    'Maine tumse promise kiya tha ke main tumhare hardest times mein tumhare saath baithunga, tumhara saath dunga, aur tumhe kabhi akela feel nahi hone dunga.',
    'Aur mujhe itna bura laga ke tumne apni tabiyat ke baare mein bhi mujhe nahi bataya... shayad tum mujhse itni door ho gayi ke tum bhool hi gayi ke main bhi tumhari fikr karta hoon.',
    'Yaar, tumne mujhe uss tarah samjha hai jaise kisi aur ne kabhi nahi samjha. You understood me like no other, aur honestly, main bas itna chahta hoon ke hum phir se waise hi best friends ban jaayein. 🥺❤️',
  ];

  // Automatically reveal the "Best Friends Forever?" prompt after the text has animated in
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBffPrompt(true);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  const handleForeverClick = () => {
    soundCtrl.playCelebration();
    fireHugeCelebration();
    // Second burst after a short delay for firework feel
    setTimeout(() => {
      fireHeartBurst();
    }, 700);
    setTimeout(() => {
      fireHugeCelebration();
    }, 1500);

    setCelebratingFinal(true);
  };

  const handleReplay = () => {
    soundCtrl.playBubble();
    onRestart();
  };

  return (
    <div className="w-full max-w-[680px] mx-auto px-4 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.96 }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 sm:p-14 md:p-16 rounded-[36px] sm:rounded-[50px] md:rounded-[60px] relative overflow-hidden text-center"
      >
        <div className="relative z-10">
          {!celebratingFinal ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-300 animate-pulse" />
                <span className="text-pink-400 font-medium tracking-[0.2em] text-xs uppercase">
                  A Promise & A Wish
                </span>
                <Sparkles className="w-4 h-4 text-pink-400" />
              </div>

              {/* Slowly displayed emotional message */}
              <div className="space-y-4 my-6 text-[#4A4A4A] font-normal text-base sm:text-lg leading-relaxed text-center sm:text-left bg-white/45 p-6 sm:p-8 rounded-[28px] border border-white/80 shadow-[0_10px_25px_rgba(255,182,193,0.15)]">
                {lines.map((line, idx) => {
                  const isHighlight =
                    line.includes('mujhe bas tum chahiye ho') ||
                    line.includes('best friends ban jaayein');

                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + idx * 0.35,
                        ease: 'easeOut',
                      }}
                      className={`${
                        isHighlight
                          ? 'text-pink-500 font-bold font-serif text-lg sm:text-xl leading-snug'
                          : 'text-[#4A4A4A] text-base sm:text-lg leading-relaxed'
                      }`}
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </div>

              {/* Best Friends Forever Reveal */}
              <AnimatePresence>
                {showBffPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="text-center mt-10 pt-8 border-t border-pink-100/80"
                  >
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#4A4A4A] mb-8 leading-tight">
                      Best Friends Forever? <span className="text-pink-500">🥺❤️</span>
                    </h3>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleForeverClick}
                      className="w-full sm:w-auto min-w-[260px] px-10 py-4 sm:py-5 rounded-full font-bold text-xl sm:text-2xl text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-[0_15px_30px_rgba(244,114,182,0.3)] hover:brightness-105 transition-all cursor-pointer inline-flex items-center justify-center gap-3"
                    >
                      <span>FOREVER</span>
                      <span>❤️🫂</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* Final Celebration Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="text-center space-y-6 py-4 max-w-md mx-auto"
            >
              {/* Joyful Animated Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-20 h-20 mx-auto rounded-full bg-rose-50 border border-pink-200 flex items-center justify-center text-pink-500 shadow-sm"
              >
                <PartyPopper className="w-10 h-10" />
              </motion.div>

              <div>
                <motion.h2
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#4A4A4A]"
                >
                  YAYYY! <span className="text-pink-500">❤️😭🫂</span>
                </motion.h2>
                <p className="text-pink-400 font-medium tracking-[0.1em] text-xs uppercase mt-2">
                  Official Best Friends Contract Renewed ✨
                </p>
              </div>

              <div className="text-[#4A4A4A] text-base sm:text-lg leading-relaxed space-y-4 bg-white/45 p-6 sm:p-8 rounded-[28px] border border-white/80 shadow-[0_10px_25px_rgba(255,182,193,0.15)] text-center">
                <p className="text-pink-500 font-bold font-serif text-2xl">
                  You're stuck with me now 😂❤️
                </p>
                <p className="text-[#5A5A5A]">
                  Best friends forever and always. 🫂❤️
                </p>
                <div className="pt-3 border-t border-pink-100">
                  <p className="text-pink-400 font-medium tracking-[0.1em] text-xs uppercase mb-1">
                    And once again...
                  </p>
                  <p className="text-[#4A4A4A] font-serif font-bold text-2xl">
                    I'm really, really sorry. <span className="text-pink-500">🥺❤️</span>
                  </p>
                </div>
              </div>

              {/* Replay Button */}
              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleReplay}
                  className="px-8 py-3.5 rounded-full font-bold text-base text-pink-500 bg-white border-2 border-pink-100 hover:border-pink-300 shadow-[0_10px_20px_rgba(0,0,0,0.04)] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Our Story</span>
                  <span>🌸</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
