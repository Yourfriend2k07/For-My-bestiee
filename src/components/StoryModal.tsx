import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundCtrl } from '../utils/audio.ts';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  emoji?: string;
  children: React.ReactNode;
  actionText: string;
  actionIcon?: string;
  type?: 'emotional' | 'playful';
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  title,
  emoji = '🥺',
  children,
  actionText,
  actionIcon,
  type = 'playful',
}) => {
  if (!isOpen) return null;

  const handleAction = () => {
    soundCtrl.playBubble();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleAction}
          className="absolute inset-0 bg-pink-900/30 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 360 }}
          className="relative w-full max-w-md p-7 sm:p-9 rounded-[36px] sm:rounded-[48px] glass-panel-darker text-center z-10 overflow-hidden shadow-[0_32px_64px_-12px_rgba(255,182,193,0.45)]"
        >
          {/* Floating Emoji Icon */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/80 flex items-center justify-center text-3xl shadow-sm border border-pink-100"
          >
            {emoji}
          </motion.div>

          {title && (
            <h3 className="text-2xl sm:text-3xl font-serif text-[#4A4A4A] mb-3 leading-snug">
              {title}
            </h3>
          )}

          <div className="text-[#6D6D6D] text-base sm:text-lg leading-relaxed mb-8 space-y-3 whitespace-pre-line">
            {children}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleAction}
            className="w-full sm:w-auto min-w-[200px] px-8 py-4 rounded-full text-white font-bold text-lg shadow-[0_15px_30px_rgba(244,114,182,0.35)] bg-gradient-to-r from-pink-400 to-rose-400 hover:brightness-105 transition-all cursor-pointer"
          >
            {actionText} {actionIcon}
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
