import React from 'react';
import { motion } from 'motion/react';
import { StoryPart } from '../types.ts';

interface ProgressBarProps {
  currentPart: StoryPart;
}

const chapterNames = [
  'Chapter One: Feelings',
  'Chapter Two: My Apology',
  'Chapter Three: Remembering Us',
  'Chapter Four: Never Leaving',
  'Chapter Five: Best Friends',
  'Chapter Six: Forever Promise',
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentPart }) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 flex flex-col items-center select-none">
      {/* Bold Typography Theme: Glowing dot indicators */}
      <div className="flex items-center gap-3 sm:gap-4 mb-3">
        {[1, 2, 3, 4, 5, 6].map((partNum) => {
          const isCurrent = partNum === currentPart;
          const isPassed = partNum < currentPart;
          return (
            <motion.div
              key={partNum}
              animate={{
                scale: isCurrent ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`transition-all duration-300 rounded-full ${
                isCurrent
                  ? 'w-3 h-3 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.85)]'
                  : isPassed
                  ? 'w-2 h-2 bg-pink-400/90'
                  : 'w-2 h-2 bg-pink-200'
              }`}
              title={`Part ${partNum}`}
            />
          );
        })}
      </div>

      {/* Chapter Subtitle with bold tracking */}
      <p className="text-pink-400 font-medium tracking-[0.2em] text-xs uppercase text-center">
        {chapterNames[currentPart - 1]}
      </p>
    </div>
  );
};
