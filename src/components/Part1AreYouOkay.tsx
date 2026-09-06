import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundCtrl } from '../utils/audio.ts';
import { StoryModal } from './StoryModal.tsx';

interface Part1Props {
  onNext: () => void;
}

export const Part1AreYouOkay: React.FC<Part1Props> = ({ onNext }) => {
  // yesAttempts: 0 -> "Are you okay? 🥺❤️", 1 -> "Are you sure? 🥺", 2 -> "Really? 👀🥺"
  const [yesAttempts, setYesAttempts] = useState(0);
  const [showLyingPopup, setShowLyingPopup] = useState(false);
  const [showComfortPopup, setShowComfortPopup] = useState(false);

  const questions = [
    'Are you okay? 🥺❤️',
    'Are you sure? 🥺',
    'Really? 👀🥺',
  ];

  const handleYes = () => {
    soundCtrl.playBubble();
    if (yesAttempts < 2) {
      setYesAttempts((prev) => prev + 1);
    } else {
      // 3rd attempt
      setShowLyingPopup(true);
    }
  };

  const handleNo = () => {
    soundCtrl.playChime(440, 0.15);
    setShowComfortPopup(true);
  };

  const handleLyingPopupClose = () => {
    setShowLyingPopup(false);
    setYesAttempts(0); // return to "Are you okay? 🥺❤️"
  };

  const handleComfortPopupClose = () => {
    setShowComfortPopup(false);
    onNext();
  };

  return (
    <div className="w-full max-w-[680px] mx-auto text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -25, scale: 0.96 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-8 sm:p-14 md:p-16 rounded-[36px] sm:rounded-[50px] md:rounded-[60px] flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="mb-6 sm:mb-8 relative">
          <div className="absolute -top-6 -right-6 text-3xl sm:text-4xl select-none">🥺</div>
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
                <>Are you okay? <span className="text-pink-500">❤️</span></>
              ) : yesAttempts === 1 ? (
                <>Are you sure? <span className="text-pink-500">🥺</span></>
              ) : (
                <>Really? <span className="text-pink-500">👀🥺</span></>
              )}
            </motion.h1>
          </AnimatePresence>
        </div>

        <p className="text-[#6D6D6D] text-base sm:text-lg mb-8 sm:mb-12 max-w-md leading-relaxed">
          I wanted to check in and see how you're feeling today. Please be honest with me...
        </p>

        {/* Buttons in Bold Typography Theme */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleYes}
            className="flex-1 bg-white border-2 border-pink-100 hover:border-pink-300 py-4 sm:py-5 px-6 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-all group cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-bold text-pink-500 group-hover:scale-105 inline-block transition-transform">
              YES 💖
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
              NO 😔
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Lying Popup */}
      <StoryModal
        isOpen={showLyingPopup}
        onClose={handleLyingPopupClose}
        emoji="😭"
        title="Busted!"
        actionText="Okay"
        actionIcon="😅"
        type="playful"
      >
        <p className="font-bold text-lg text-pink-600">
          You're lying 😭😂❤️
        </p>
        <p className="text-slate-600">
          Try again! Be honest with me!
        </p>
      </StoryModal>

      {/* Emotional Comfort Popup */}
      <StoryModal
        isOpen={showComfortPopup}
        onClose={handleComfortPopupClose}
        emoji="🫂"
        title="Don't worry... ❤️"
        actionText="Read & Continue"
        actionIcon="❤️"
        type="emotional"
      >
        <p className="text-slate-700 leading-relaxed text-left sm:text-center text-base sm:text-lg">
          I promised you that I will always be there for you.
          <br /><br />
          You don't always have to pretend that you're okay.
          <br /><br />
          No matter what you're going through, you can always talk to me.
          <br /><br />
          <span className="font-semibold text-pink-600">
            You don't have to face everything alone. 🫂❤️
          </span>
        </p>
      </StoryModal>
    </div>
  );
};
