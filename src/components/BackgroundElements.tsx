import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface HeartConfig {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export const BackgroundElements: React.FC = () => {
  const floatingItems: HeartConfig[] = useMemo(() => {
    const emojis = ['💖', '🌸', '✨', '💕', '🥺', '🫧', '🤍', '🌷', '🎀'];
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.floor((i * 4.7 + 3) % 95),
      size: 16 + ((i * 7) % 24),
      duration: 12 + ((i * 3) % 10),
      delay: (i * 1.3) % 9,
      rotation: ((i * 25) % 60) - 30,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft warm pastel atmospheric gradient blobs from Bold Typography theme */}
      <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-pink-200/50 blur-3xl" />
      <div className="absolute -bottom-24 -right-12 w-96 h-96 rounded-full bg-purple-200/50 blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-pink-100/60 blur-3xl" />

      {/* Large decorative soft pastel hearts from theme */}
      <div className="absolute top-[18%] left-[10%] sm:left-[15%] text-pink-200/70 text-5xl sm:text-6xl select-none">♥</div>
      <div className="absolute top-[58%] right-[8%] sm:right-[12%] text-pink-200/70 text-4xl sm:text-5xl rotate-12 select-none">♥</div>
      <div className="absolute bottom-[14%] left-[18%] sm:left-[24%] text-pink-200/60 text-5xl sm:text-6xl -rotate-12 select-none">♥</div>
      <div className="absolute top-[12%] right-[24%] sm:right-[30%] text-pink-200/50 text-3xl sm:text-4xl select-none">♥</div>

      {/* Ambient floating theme accents */}
      <div className="absolute top-20 left-10 sm:left-36 text-3xl sm:text-4xl opacity-40 animate-pulse select-none">✨</div>
      <div className="absolute bottom-36 right-8 sm:right-24 text-4xl sm:text-5xl opacity-40 animate-pulse select-none">💖</div>
      <div className="absolute top-1/4 right-1/4 text-2xl sm:text-3xl opacity-30 select-none">☁️</div>
      <div className="absolute bottom-1/4 left-8 sm:left-14 text-3xl sm:text-4xl opacity-30 select-none">🌸</div>

      {/* Floating cute hearts and sparkles */}
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none user-select-none opacity-30 hover:opacity-60 transition-opacity"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            bottom: '-10%',
          }}
          animate={{
            y: ['0vh', '-115vh'],
            x: [0, (item.id % 2 === 0 ? 25 : -25), 0],
            rotate: [item.rotation, item.rotation + 25, item.rotation - 25],
            opacity: [0, 0.35, 0.45, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Subtle star sparkles at fixed cozy spots */}
      <motion.div
        className="absolute top-28 left-[22%] text-pink-300 text-sm select-none"
        animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute top-48 right-[18%] text-purple-300 text-lg select-none"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 4.2, repeat: Infinity, delay: 1 }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[12%] text-rose-300 text-xs select-none"
        animate={{ scale: [0.7, 1.2, 0.7], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 2 }}
      >
        ✦
      </motion.div>
    </div>
  );
};
