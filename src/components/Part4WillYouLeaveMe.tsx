import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundCtrl } from '../utils/audio.ts';
import { fireHeartBurst } from '../utils/confetti.ts';
import { StoryModal } from './StoryModal.tsx';
import { Heart, Sparkles } from 'lucide-react';

interface Part4Props {
  onNext: () => void;
}

export const Part4WillYouLeaveMe: React.FC<Part4Props> = ({ onNext }) => {
  const [yesAttempts, setYesAttempts] = useState(0);
  const [showRefusalPopup, setShowRefusalPopup] = useState(false);
  const [showComfortResponse, setShowComfortResponse] = useState(false);

  const questions = [
    'Will you leave me? 🥺💔',
    'Wait... are you serious? 🥺',
    "You're really going to leave me? 😭💔",
  ];

  const handleYes = () => {
    soundCtrl.playBubble();
    if (yesAttempts < 2) {
      setYesAttempts((prev) => prev + 1);
    } else {
      setShowRefusalPopup(true);
    }
  };

  const handleNo = () => {
    soundCtrl.playChime(783.99, 0.16);
    fireHeartBurst();
    setShowComfortResponse(true);
  };

  const handleRefusalClose = () => {
    setShowRefusalPopup(false);
    setYesAttempts(0); // return to initial question
  };

  const handleContinue = () => {
    soundCtrl.playBubble();
    onNext();
  };

  return (
    <div className="w-full max-w-[680px] mx-auto text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -25, scale: 0.96 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-8 sm:p-14 md:p-16 rounded-[36px] sm:rounded-[50px] md:rounded-[60px] relative overflow-hidden flex flex-col items-center text-center"
      >
        {!showComfortResponse ? (
          <>
            <div className="mb-6 sm:mb-8 relative">
              <div className="absolute -top-6 -right-6 text-3xl sm:text-4xl select-none">🫂</div>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={yesAttempts}
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#4A4A4A] text-4xl sm:text-6xl md:text-7xl font-serif leading-tight tracking-tight min-h-[4rem] sm:min-h-[5.5rem] flex items-center justify-center"
                >
                  {yesAttempts === 0 ? (
                    <>Will you leave me? <span className="text-pink-500">🥺</span></>
                  ) : yesAttempts === 1 ? (
                    <>Are you really leaving? <span className="text-pink-500">🥺💔</span></>
                  ) : (
                    <>Seriously?! <span className="text-pink-500">😭💔</span></>
                  )}
                </motion.h1>
              </AnimatePresence>
            </div>

            <p className="text-[#6D6D6D] text-base sm:text-lg mb-8 sm:mb-12 max-w-md leading-relaxed">
              You know you can't get rid of me that easily, right? 🥺
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleYes}
                className="flex-1 bg-white border-2 border-pink-100 hover:border-pink-300 py-4 sm:py-5 px-6 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-all group cursor-pointer"
              >
                <span className="text-xl sm:text-2xl font-bold text-pink-500 group-hover:scale-105 inline-block transition-transform">
                  YES 😭
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleNo}
                className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 py-4 sm:py-5 px-6 rounded-full shadow-[0_15px_30px_rgba(244,114,182,0.3)] hover:brightness-105 transition-all group cursor-pointer"
              >
                <span className="text-xl sm:text-2xl font-bold text-white group-hover:scale-105 inline-block transition-transform">
                  NO ❤️
                </span>
              </motion.button>
            </div>
          </>
        ) : (
          /* Heart animation response */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 w-full max-w-md"
          >
            <div className="relative w-18 h-18 mx-auto">
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 4, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-18 h-18 rounded-full bg-rose-50 border border-pink-200 flex items-center justify-center text-rose-500 shadow-sm"
              >
                <Heart className="w-9 h-9 fill-rose-500" />
              </motion.div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif text-[#4A4A4A]">
              Good <span className="text-pink-500">🥹❤️</span>
            </h3>

            <div className="text-[#4A4A4A] text-base sm:text-lg leading-relaxed space-y-3 bg-white/45 p-6 sm:p-8 rounded-[28px] border border-white/80 shadow-[0_10px_25px_rgba(255,182,193,0.15)]">
              <p>Because no matter how many arguments,</p>
              <p>misunderstandings, or bad days we have...</p>
              <p>I hope we'll always find our way back to each other.</p>
              <p className="font-bold text-pink-500 font-serif text-lg sm:text-xl">
                Our friendship means too much to me. 🫂❤️
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleContinue}
              className="px-10 py-4 sm:py-5 rounded-full font-bold text-xl text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-[0_15px_30px_rgba(244,114,182,0.3)] hover:brightness-105 transition-all cursor-pointer inline-flex items-center gap-3"
            >
              <span>One More Thing</span>
              <span>👀❤️</span>
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Refusal Popup */}
      <StoryModal
        isOpen={showRefusalPopup}
        onClose={handleRefusalClose}
        emoji="😤"
        title="Denied!"
        actionText="Try Again"
        actionIcon="🥺❤️"
        type="playful"
      >
        <p className="font-bold text-xl text-pink-600">
          Nope 😤😂❤️
        </p>
        <p className="text-slate-700 text-lg">
          I refuse to believe that!
        </p>
        <p className="text-slate-500">
          Try again! 🫂
        </p>
      </StoryModal>
    </div>
  );
};
