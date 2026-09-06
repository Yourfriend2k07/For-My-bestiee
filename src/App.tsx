import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StoryPart } from './types.ts';
import { BackgroundElements } from './components/BackgroundElements.tsx';
import { ProgressBar } from './components/ProgressBar.tsx';
import { MusicToggle } from './components/MusicToggle.tsx';
import { Part1AreYouOkay } from './components/Part1AreYouOkay.tsx';
import { Part2Apology } from './components/Part2Apology.tsx';
import { Part3WillYouForgetMe } from './components/Part3WillYouForgetMe.tsx';
import { Part4WillYouLeaveMe } from './components/Part4WillYouLeaveMe.tsx';
import { Part5AreWeStillFriends } from './components/Part5AreWeStillFriends.tsx';
import { Part6FinalMessage } from './components/Part6FinalMessage.tsx';

export default function App() {
  const [currentPart, setCurrentPart] = useState<StoryPart>(1);

  const goToNextPart = () => {
    setCurrentPart((prev) => (Math.min(prev + 1, 6) as StoryPart));
  };

  const handleRestart = () => {
    setCurrentPart(1);
  };

  return (
    <div
      id="apology-story-app"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#FFF0F5] text-[#4A4A4A] selection:bg-pink-300 selection:text-pink-900"
    >
      {/* Ambient background particles & floating hearts */}
      <BackgroundElements />

      {/* Floating gentle music toggle */}
      <MusicToggle />

      {/* Header with Story Progress Indicator */}
      <header className="relative z-20 pt-6 pb-2 px-4">
        <ProgressBar currentPart={currentPart} />
      </header>

      {/* Main Interactive Story Viewport */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-6 sm:py-10 px-4 sm:px-8">
        <AnimatePresence mode="wait">
          {currentPart === 1 && (
            <motion.div
              key="part-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <Part1AreYouOkay onNext={goToNextPart} />
            </motion.div>
          )}

          {currentPart === 2 && (
            <motion.div
              key="part-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <Part2Apology onNext={goToNextPart} />
            </motion.div>
          )}

          {currentPart === 3 && (
            <motion.div
              key="part-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <Part3WillYouForgetMe onNext={goToNextPart} />
            </motion.div>
          )}

          {currentPart === 4 && (
            <motion.div
              key="part-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <Part4WillYouLeaveMe onNext={goToNextPart} />
            </motion.div>
          )}

          {currentPart === 5 && (
            <motion.div
              key="part-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <Part5AreWeStillFriends onNext={goToNextPart} />
            </motion.div>
          )}

          {currentPart === 6 && (
            <motion.div
              key="part-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <Part6FinalMessage onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Tender footer with quote from Bold Typography design */}
      <footer className="relative z-10 w-full px-6 sm:px-12 pb-6 sm:pb-8 pt-2 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-3 select-none">
        <div className="text-xs text-pink-400 font-medium">
          <span>Made with ❤️ for my best friend</span>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-1">
            A message for my bestie
          </p>
          <p className="text-[#4A4A4A] text-sm italic font-serif">
            "A friend is what the heart needs all the time."
          </p>
        </div>
      </footer>
    </div>
  );
}
