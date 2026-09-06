import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundCtrl } from '../utils/audio.ts';
import { fireHugeCelebration } from '../utils/confetti.ts';
import { Sparkles, Heart, PartyPopper } from 'lucide-react';

interface Part5Props {
  onNext: () => void;
}

export const Part5AreWeStillFriends: React.FC<Part5Props> = ({ onNext }) => {
  const [celebrating, setCelebrating] = useState(false);

  const handleChoice = () => {
    soundCtrl.playCelebration();
    fireHugeCelebration();
    setCelebrating(true);
  };

  const handleContinue = () => {
    soundCtrl.playBubble();
    onNext();
  };

  return (
    <div className="w-full max-w-[680px] mx-auto text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.96 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 sm:p-14 md:p-16 rounded-[36px] sm:rounded-[50px] md:rounded-[60px] relative overflow-hidden flex flex-col items-center text-center"
      >
        {!celebrating ? (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 text-pink-400 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-pink-400 font-medium tracking-[0.2em] text-xs uppercase">
                The most important question
              </span>
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="mb-6 sm:mb-8 relative">
              <div className="absolute -top-6 -right-6 text-3xl sm:text-4xl select-none">🥺</div>
              <h1 className="text-[#4A4A4A] text-4xl sm:text-6xl md:text-7xl font-serif leading-tight tracking-tight">
                Are we still best friends? <span className="text-pink-500">💖</span>
              </h1>
            </div>

            <p className="text-[#6D6D6D] text-base sm:text-lg mb-8 sm:mb-12 max-w-md leading-relaxed">
              There is only one right answer... well, actually two wonderful ones! ✨
            </p>

            {/* Two affirmative buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleChoice}
                className="flex-1 bg-white border-2 border-pink-100 hover:border-pink-300 py-4 sm:py-5 px-6 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-all group cursor-pointer"
              >
                <span className="text-xl sm:text-2xl font-bold text-pink-500 group-hover:scale-105 inline-block transition-transform">
                  OF COURSE ❤️
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleChoice}
                className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 py-4 sm:py-5 px-6 rounded-full shadow-[0_15px_30px_rgba(244,114,182,0.3)] hover:brightness-105 transition-all group cursor-pointer"
              >
                <span className="text-xl sm:text-2xl font-bold text-white group-hover:scale-105 inline-block transition-transform">
                  ALWAYS 🫂
                </span>
              </motion.button>
            </div>
          </div>
        ) : (
          /* Celebration View */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 22 }}
            className="space-y-6 w-full max-w-md"
          >
            <motion.div
              animate={{
                rotate: [-8, 8, -8],
                scale: [1, 1.15, 1],
              }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="inline-flex items-center justify-center w-18 h-18 rounded-full bg-rose-50 border border-pink-200 text-pink-500 shadow-sm"
            >
              <PartyPopper className="w-9 h-9" />
            </motion.div>

            <div>
              <motion.h2
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-4xl sm:text-5xl font-serif text-[#4A4A4A]"
              >
                YAYYYYY! <span className="text-pink-500">😭❤️🎉</span>
              </motion.h2>
              <p className="text-pink-400 font-medium tracking-[0.1em] text-xs uppercase mt-2">
                You just made my entire world brighter ✨
              </p>
            </div>

            <div className="text-[#4A4A4A] text-base sm:text-lg leading-relaxed space-y-3 bg-white/45 p-6 sm:p-8 rounded-[28px] border border-white/80 shadow-[0_10px_25px_rgba(255,182,193,0.15)] text-left sm:text-center">
              <p className="text-pink-500 font-bold font-serif text-xl">Thank you 🥹❤️</p>
              <p>No matter how many arguments we have...</p>
              <p>No matter how many misunderstandings happen...</p>
              <p>No matter how annoying I can be 😂...</p>
              <p>You're still one of the most important people in my life.</p>
              <p className="font-bold text-pink-500 font-serif text-lg sm:text-xl">
                And I really don't want to lose you. 🫂❤️
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleContinue}
              className="px-10 py-4 sm:py-5 rounded-full font-bold text-xl text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-[0_15px_30px_rgba(244,114,182,0.3)] hover:brightness-105 transition-all cursor-pointer inline-flex items-center gap-3"
            >
              <span>One Last Thing...</span>
              <span>🥺</span>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
