import React from 'react';
import { motion } from 'motion/react';
import { soundCtrl } from '../utils/audio.ts';
import { Heart, Sparkles } from 'lucide-react';

interface Part2Props {
  onNext: () => void;
}

export const Part2Apology: React.FC<Part2Props> = ({ onNext }) => {
  const paragraphs = [
    'If I ever hurt you...',
    'If I ever annoyed you...',
    'If I ever made you sad...',
    "Or if I ever made you feel like you didn't matter to me...",
    "I'm truly sorry. 🥺",
    'You are my best friend, and I never wanted to hurt you.',
    'Sometimes I make mistakes.',
    "Sometimes I don't say things the right way.",
    'But please know that you are genuinely important to me.',
    'And I never want to lose our friendship. ❤️🫂',
  ];

  const handleContinue = () => {
    soundCtrl.playChime(587.33, 0.12);
    onNext();
  };

  return (
    <div className="w-full max-w-[680px] mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 sm:p-14 md:p-16 rounded-[36px] sm:rounded-[50px] md:rounded-[60px] relative overflow-hidden"
      >
        {/* Cute top decorative badge */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-pink-400 font-medium tracking-[0.2em] text-xs uppercase">
            From the bottom of my heart
          </span>
          <Heart className="w-4 h-4 text-pink-400 fill-pink-300" />
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#4A4A4A] text-center mb-8 leading-tight"
        >
          I'm so sorry... <span className="text-pink-500">🥺❤️</span>
        </motion.h2>

        {/* Letter container with staggered revelation */}
        <div className="space-y-4 my-6 text-[#4A4A4A] font-normal text-base sm:text-lg leading-relaxed text-center sm:text-left bg-white/45 p-6 sm:p-8 rounded-[28px] border border-white/80 shadow-[0_10px_25px_rgba(255,182,193,0.15)]">
          {paragraphs.map((line, idx) => {
            const isHighlight =
              line.includes('truly sorry') ||
              line.includes('best friend') ||
              line.includes('never want to lose');

            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + idx * 0.22,
                  ease: 'easeOut',
                }}
                className={`${
                  isHighlight
                    ? 'text-pink-500 font-bold text-lg sm:text-xl'
                    : 'text-[#5A5A5A]'
                }`}
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.6, duration: 0.4 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleContinue}
            className="px-10 py-4 sm:py-5 rounded-full font-bold text-xl text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-[0_15px_30px_rgba(244,114,182,0.3)] hover:brightness-105 transition-all cursor-pointer inline-flex items-center gap-3"
          >
            <span>Continue</span>
            <span>💌</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
